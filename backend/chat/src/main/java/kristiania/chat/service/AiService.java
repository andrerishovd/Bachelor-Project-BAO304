package kristiania.chat.service;

import kristiania.chat.dto.ContentItemDto;
import kristiania.chat.dto.OpenAiResponseDto;
import kristiania.chat.dto.OutputItemDto;
import kristiania.chat.modules.*;

import org.springframework.ai.reader.tika.TikaDocumentReader;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.ai.document.Document;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AiService {

    private final RestClient restClient;
    private final String model;
    private final String personality;
    private final FileService fileService;
    private final VectorStore vectorStore;
    @Value("${COURSE_MATERIAL_PATH:/courseMaterial}")
    String courseMaterialDirectory;

    public AiService (
            @Value("${OPEN_AI_API_KEY}") String apiKey,
            @Value("${BASE_URL}") String baseUrl,
            @Value("${MODEL}") String model,
            @Value("${PERSONALITY}") String personality,
            FileService fileService,
            VectorStore vectorStore) {
        this.vectorStore = vectorStore;

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
            .requestFactory(customRequestFactory())
            .build();
        this.fileService = fileService;
    }

    private ClientHttpRequestFactory customRequestFactory() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();

        factory.setConnectTimeout(Duration.ofMillis(1000));
        factory.setReadTimeout(Duration.ofMillis(120000));

        return factory;
    }

    public ChatResponse sendChat(Long chatId, String userMessage) {
        Map<String, Object> body = buildRequestBodyWithoutChat(userMessage);

        OpenAiResponseDto resp = restClient.post()
            .uri("/v1/responses")
            .body(body)
            .retrieve()
            .body(OpenAiResponseDto.class);

        String reply = extractOutputText(resp);
        return new ChatResponse(chatId, reply);
    }

    public ChatResponse sendToExistingChat(String userMessage, Chat chat) {
        Map<String, Object> body = buildRequestBodyWithChat(userMessage, chat);

        OpenAiResponseDto resp = restClient.post()
            .uri("/v1/responses")
            .body(body)
            .retrieve()
            .body(OpenAiResponseDto.class);

        String reply = extractOutputText(resp);
        return new ChatResponse(chat.getId(), reply);
    }

    private Map<String, Object> buildRequestBodyWithoutChat(String userMessage) {
        Map<String, Object> body = new HashMap<>();
        List<Map<String, Object>> tools = new ArrayList<>();
        Map<String, Object> webSearchTool = new HashMap<>();
        List<Map<String, Object>> input = new ArrayList<>();

        webSearchTool.put("type", "web_search");
        tools.add(webSearchTool);

        // model
        body.put("model", model);
        body.put("tools", tools);

        /*
        reasoning

        Map<String, Object> reasoning = new HashMap<>();
            reasoning.put("effort", "low");

            body.put("reasoning", reasoning);
        */

        // Ai role and personality
        input.add(Map.of("role", "system", "content", personality));

        String retrievedContext = retrieveContext(userMessage);

        // User message
        input.add(Map.of(
        "role",
        "user",
        "content",
        "Use this context if needed, let the user know if the answer is not within the context and try web search instead [Vector context:"
            + retrievedContext
            + "] [User message: "
            + userMessage + "]"
        ));

        body.put("input", input);
        body.put("text", Map.of("format", Map.of("type", "text")));

        return body;
    }

    private Map<String, Object> buildRequestBodyWithChat(String userMessage, Chat chat) {
        Map<String, Object> body = new HashMap<>();
        List<Map<String, Object>> tools = new ArrayList<>();
        Map<String, Object> webSearchTool = new HashMap<>();
        List<Map<String, Object>> input = new ArrayList<>();

        webSearchTool.put("type", "web_search");
        tools.add(webSearchTool);

        body.put("model", model);
        body.put("tools", tools);

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
                    "content", message.getBody()
            ));
        }

        String retrievedContext = retrieveContext(userMessage);

        // User message + context
        input.add(Map.of(
        "role",
        "user",
        "content",
        "Use this context if needed, let the user know if the answer is not within the context and try web search instead [Vector context:"
            + retrievedContext
            + "] [User message: "
            + userMessage + "]"
        ));

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

    private String retrieveContext(String userMessage) {
        // Based on https://howtodoinjava.com/spring-ai/chatbot-example-with-rag/#4-uploading-files-and-generating-embeddings
        SearchRequest searchRequest = SearchRequest.builder()
            .query(userMessage)
            .similarityThreshold(0.2d)
            .topK(30)
            .build();

        List<Document> documents = vectorStore.similaritySearch(searchRequest);

        String retrievedContext = documents.stream()
            .map(Document::getText)
            .filter(Objects::nonNull)
            .collect(Collectors.joining("\n\n---\n\n"));

        return retrievedContext;
    }

    public MultipartFileUploadResponse uploadMultiPartFileToVectorDb(MultipartFile file) {
        Path destinationFile = Paths.get("/courseMaterial/PJ6100-1").resolve(
                Paths.get(file.getOriginalFilename())).normalize().toAbsolutePath();

        try {
            InputStream inputStream = file.getInputStream();
            Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        TikaDocumentReader documentReader = new TikaDocumentReader(destinationFile.toUri().toString());
        List<org.springframework.ai.document.Document> documents = documentReader.get();
        List<Document> splitDocuments = TokenTextSplitter.builder()
            .build()
            .apply(documents);

        vectorStore.add(splitDocuments);

        return new MultipartFileUploadResponse(file.getOriginalFilename(), file.getContentType(), file.getSize());
    }

    public FileUploadResponse uploadFileToVectorDb(Path filePath) {

        try {
            TikaDocumentReader documentReader = new TikaDocumentReader(filePath.toUri().toString());
            List<Document> documents = documentReader.get();
            List<Document> splitDocuments = TokenTextSplitter.builder()
                .build()
                .apply(documents);

            vectorStore.add(splitDocuments);

            String contentType = Files.probeContentType(filePath);
            long size = Files.size(filePath);

            return new FileUploadResponse(filePath.getFileName().toString(), contentType, size);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public List<FileUploadResponse> uploadFolderToVectorDb(String folderPath) {
        Path folder = Paths.get(courseMaterialDirectory + "/" + folderPath).normalize().toAbsolutePath();

        if(!Files.exists(folder)) {
            throw new IllegalArgumentException("Folder does not exist" + folder);
        }

        try {
            List<FileUploadResponse> fileUploadResponseList = Files.walk(folder)
                .filter(Files::isRegularFile)
                .map(this::uploadFileToVectorDb)
                .toList();

            return fileUploadResponseList;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}
