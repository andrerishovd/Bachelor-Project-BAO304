package kristiania.chat.service;

import kristiania.chat.dto.ContentItemDto;
import kristiania.chat.dto.OpenAiResponseDto;
import kristiania.chat.dto.OutputItemDto;
import kristiania.chat.modules.Chat;
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
        Map<String, Object> body = buildRequestBodyWithoutChat(userMessage);

        OpenAiResponseDto resp = restClient.post()
                .uri("/v1/responses")
                .body(body)
                .retrieve()
                .body(OpenAiResponseDto.class);

        String reply = extractOutputText(resp);
        return new ChatResponse(reply);
    }

    public ChatResponse sendToExistingChat(String userMessage, Chat chat) {
        Map<String, Object> body = buildRequestBodyWithChat(userMessage, chat);

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
    private Map<String, Object> buildRequestBodyWithoutChat(String userMessage) {
        Map<String, Object> body = new HashMap<>();

        // model
        body.put("model", model);

        /*
        reasoning ( not supported for 4.0 mini )

        Map<String, Object> reasoning = new HashMap<>();
            reasoning.put("effort", "low");

            body.put("reasoning", reasoning);
        */

        //input
        List<Map<String, Object>> input = new ArrayList<>();

        // Ai role and personality
        input.add(Map.of("role", "system", "content", personality));

        // User message
        input.add(Map.of("role", "user", "content", userMessage));


        body.put("input", input);

        body.put("text", Map.of("format", Map.of("type", "text")));

        return body;
    }
    private Map<String, Object> buildRequestBodyWithChat(String userMessage, Chat chat) {
        Map<String, Object> body = new HashMap<>();

        // model
        body.put("model", model);

        /*
        reasoning ( not supported for 4.0 mini )

        Map<String, Object> reasoning = new HashMap<>();
            reasoning.put("effort", "low");

            body.put("reasoning", reasoning);
        */

        //input
        List<Map<String, Object>> input = new ArrayList<>();

            // Ai role and personality
            input.add(Map.of("role", "system", "content", personality));

            // Message history
            for (Message message : chat.getMessageList()) {

                String role;
                switch (message.getSenderType()) {
                    case USER:
                        role = "user";
                        break;
                    case AI:
                        role = "assistant";
                        break;
                    default:
                        continue;
                }

                input.add(Map.of(
                        "role", role,
                        "content", message.getLocalDateTime().toString()+message.getBody()
                ));
            }

            // User message
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
