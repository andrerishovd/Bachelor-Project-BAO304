package kristiania.chat.service;

import kristiania.chat.dto.ContentItemDto;
import kristiania.chat.dto.OpenAiResponseDto;
import kristiania.chat.dto.OutputItemDto;
import kristiania.chat.modules.ChatResponse;
import kristiania.chat.modules.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AiService {

    private final RestClient restClient;
    private final String model;
    private final String personality;


    public AiService (
            @Value("${OPEN_AI_API_KEY}") String apiKey,
            @Value("${BASE_URL}") String baseUrl,
            @Value("${MODEL}") String model,
            @Value("${PERSONALITY}") String personality
    ) {

        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException("OPEN_AI_API_KEY is not set.");
        }
        if (baseUrl == null || baseUrl.isBlank()) {
            throw new IllegalStateException("BASE_URL is not set.");
        }
        if (model == null || model.isBlank()) {
            throw new IllegalStateException("MODEL is not set.");
        }

        this.model = model;
        this.personality = personality;

        this.restClient = RestClient.builder()
            .baseUrl(baseUrl)
            .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();
    }

    public ChatResponse sendChat(String userMessage) {
        //for (Message message : messageList) {}
        Map<String, Object> body = buildRequestBody(userMessage);

        OpenAiResponseDto resp = restClient.post()
                .uri("/v1/responses")
                .body(body)
                .retrieve()
                .body(OpenAiResponseDto.class);

        String reply = extractOutputText(resp);
        return new ChatResponse(reply);
    }

    /*
    https://developers.openai.com/api/docs/guides/text
    model: "gpt-5",
    reasoning: { effort: "low" },
    input: [
        {
            role: "developer",
            content: "Talk like a pirate."
        },
        {
            role: "user",
            content: "Are semicolons optional in JavaScript?",
        },
    ],

     */
    private Map<String, Object> buildRequestBody(String userMessage) {
        Map<String, Object> body = new HashMap<>();

        // model
        body.put("model", model);

        //reasoning ( not supported for 4.0 mini )
        /*

        Map<String, Object> reasoning = new HashMap<>();
            reasoning.put("effort", "low");

            body.put("reasoning", reasoning);
        */

        //input
        List<Map<String, Object>> input = new ArrayList<>();

            // Ai role and personality
            input.add(Map.of("role", "system", "content", personality));

            // User message/history
            input.add(Map.of("role", "user", "content", userMessage));


            body.put("input", input);

        body.put("text", Map.of("format", Map.of("type", "text")));

        return body;
    }

    private String extractOutputText(OpenAiResponseDto resp) {
        if (resp == null || resp.output() == null) return "";

        StringBuilder stringBuilder = new StringBuilder();

        for (OutputItemDto item : resp.output()) {
            if (item == null || item.content() == null) continue;

            for (ContentItemDto contentItemDto : item.content()) {
                if (contentItemDto == null) continue;

                if ("output_text".equals(contentItemDto.type()) && contentItemDto.text() != null) {
                    if (!stringBuilder.isEmpty()) stringBuilder.append("\n");
                    stringBuilder.append(contentItemDto.text());
                }
            }
        }

        return stringBuilder.toString();
    }
}
