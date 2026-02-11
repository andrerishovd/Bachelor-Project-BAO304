package kristiania.chat.service;

import io.github.cdimascio.dotenv.Dotenv;
import kristiania.chat.dto.*;
import kristiania.chat.enums.SenderType;
import kristiania.chat.modules.Chat;
import kristiania.chat.modules.ChatRequest;
import kristiania.chat.modules.ChatResponse;
import kristiania.chat.modules.Message;
import kristiania.chat.repository.ChatRepository;
import kristiania.chat.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatService {

    private ChatRepository chatRepository;
    private MessageRepository messageRepository;

    private final RestClient restClient;
    private final String model;


    public ChatService(
            @Value("${OPEN_AI_API_KEY}") String apiKey,
            @Value("${BASE_URL}") String baseUrl,
            @Value("${MODEL}") String model
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

        this.restClient = RestClient.builder()
                .baseUrl(baseUrl)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public ChatResponse chat(String userMessage) {
        Map<String, Object> body = buildRequestBody(userMessage);

        OpenAiResponseDto resp = restClient.post()
                .uri("/v1/responses")
                .body(body)
                .retrieve()
                .body(OpenAiResponseDto.class);

        String reply = extractOutputText(resp);
        return new ChatResponse(reply);
    }

    private Map<String, Object> buildRequestBody(String userMessage) {
        Map<String, Object> body = new HashMap<>();
        body.put("model", model);

        List<Map<String, Object>> input = new ArrayList<>();
        input.add(Map.of("role", "system", "content", "You are a helpful demo assistant."));
        input.add(Map.of("role", "user", "content", userMessage));
        body.put("input", input);

        body.put("text", Map.of("format", Map.of("type", "text")));

        return body;
    }

    private String extractOutputText(OpenAiResponseDto resp) {
        if (resp == null || resp.output() == null) return "";

        StringBuilder sb = new StringBuilder();

        for (OutputItemDto item : resp.output()) {
            if (item == null || item.content() == null) continue;

            for (ContentItemDto c : item.content()) {
                if (c == null) continue;

                if ("output_text".equals(c.type()) && c.text() != null) {
                    if (!sb.isEmpty()) sb.append("\n");
                    sb.append(c.text());
                }
            }
        }

        return sb.toString();
    }

    // make own service?
    public void saveMessage(MessageDto messageDto) {
        // create new chat
        Long newChatId = createChat();

        // save message to that chat
        Message message = Message.builder()
                        .body(messageDto.body())
                        .localDateTime(LocalDateTime.now())
                        .senderType(SenderType.USER)
                        .senderId("22")
                        .chat(chatRepository.getReferenceById(newChatId))
                        .build();

        messageRepository.save(message);
    }

    // make own service?
    public void saveMessage(MessageDto messageDto, Chat chat) {
        // save message to parameter chat
    }

    public Long createChat() {
        // save chat
        ArrayList<Message> messageList = new ArrayList<>();
        Chat chat = Chat.builder()
            .title("title1")
            .userId("11")
            .messageList(messageList)
            .build();

        Chat savedChat = chatRepository.save(chat);
        return savedChat.getId();
    }

    public List<ChatTitleDto> getAllChats() {
        return new ArrayList<>();
    }

    public List<ChatTitleDto> getAllChatsFromUser(String userId) {
        return null;
    }

    public ChatDto getChatWithId(String id) {
        return null;
    }

    public MessageDto getMessageFromId(String messageId) {
        return null;
    }

    public ChatResponse createNewChat(ChatRequest request) {
        return chat(request.getMessage());
    }

    public ChatDto createNewChatFromUserId(MessageDto messageDto, String userId) {
        return null;
    }

    public MessageDto createNewMessage(MessageDto messageDto) {
        return null;
    }

    public MessageDto createNewMessageFromUserId(MessageDto messageDto, String userId, String chatId) {
        return null;
    }

    public MessageDto putMessageFromId(String messageId) {
        return null;
    }

    public MessageDto putChatFromId(String chatId) {
        return null;
    }

    public Void deleteAllChats() {
        return null;
    }

    public Void deleteAllChatsFromUserId(String userId) {
        return null;
    }

    public Void deleteChatFromId(String chatId) {
        return null;
    }

    public Void deleteMessageFromId(String messageId) {
        return null;
    }
}
