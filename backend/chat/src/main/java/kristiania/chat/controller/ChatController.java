package kristiania.chat.controller;

//import com.openai.models.vectorstores.VectorStore;
import kristiania.chat.dto.ChatDto;
import kristiania.chat.dto.ChatFileUploadResponseDto;
import kristiania.chat.dto.ChatTitleDto;
import kristiania.chat.dto.MessageDto;
import kristiania.chat.modules.ChatRequest;
import kristiania.chat.modules.ChatResponse;
import kristiania.chat.modules.FileUploadResponse;
import kristiania.chat.service.ChatService;
import org.slf4j.Logger;
import org.springframework.ai.document.Document;
import org.springframework.ai.reader.tika.TikaDocumentReader;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.ai.vectorstore.VectorStore;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;
    //private final MessageService messageService;
    private static final Logger LOG = org.slf4j.LoggerFactory.getLogger(ChatController.class);

    private final VectorStore vectorStore;

    @Autowired
    public ChatController(ChatService chatService, VectorStore vectorStore) {
        this.chatService = chatService;
        this.vectorStore = vectorStore;
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //@CrossOrigin
    @GetMapping("/all")
    public ResponseEntity<List<ChatDto>> getAllChats() {
        return ResponseEntity.ok(chatService.getAllChatsDto());
    }

    //@CrossOrigin
    @GetMapping("/all/title")
    public ResponseEntity<List<ChatTitleDto>> getAllChatTitles() {
        return ResponseEntity.ok(chatService.getAllChatTitlesDto());
    }

    /*
    @CrossOrigin
    @GetMapping("/all/title/userId/{userId}")
    public ResponseEntity<List<ChatTitleDto>> getAllChatTitlesFromUser(@PathVariable String userId) {
        return ResponseEntity.ok( chatService.getAllChatTitlesFromUser(userId) );
    }


    @CrossOrigin
    @GetMapping("/userId/{userId}")
    public ResponseEntity<List<ChatTitleDto>> getAllChatsFromUser(@PathVariable String userId) {
        return ResponseEntity.ok(chatService.getAllChatsFromUser(userId));
    }
     */

    //@CrossOrigin
    @GetMapping("/chatId/{chatId}")
    public ResponseEntity<ChatDto> getChatFromId(@PathVariable String chatId) {
        return ResponseEntity.ok(chatService.getChatDtoFromId(chatId));
    }

    //@CrossOrigin
    @GetMapping("/messageId/{messageId}")
    public ResponseEntity<MessageDto> getMessageFromId(@PathVariable String messageId) {
        return ResponseEntity.ok(chatService.getMessageDtoFromId(messageId));
    }

    //@CrossOrigin
    @GetMapping("/downloadZip")
    public ResponseEntity<Void> getZipFromCanvasTemp() {
        return ResponseEntity.ok(chatService.getZipFromCanvasTemp());
    }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POST
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Post new chat without user id (for testing)
    //@CrossOrigin
    @PostMapping("/new")
    public ChatResponse postMessageAndCreateNewChat(@RequestBody ChatRequest request) {
        if (request == null || request.getMessage() == null || request.getMessage().isBlank()) {
            return new ChatResponse(null, "Please send a non-empty message.");
        }
        return chatService.createNewChatFromChatRequest(request);
    }

    // https://howtodoinjava.com/spring-ai/chatbot-example-with-rag/
    @PostMapping("/upload")
    public FileUploadResponse upload(@RequestParam("file") MultipartFile file) throws IOException {

        Path destinationFile = Paths.get("/courseMaterial/PJ6100-1").resolve(
                Paths.get(file.getOriginalFilename())).normalize().toAbsolutePath();

        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
        }

        TikaDocumentReader documentReader = new TikaDocumentReader(destinationFile.toUri().toString());
        List<org.springframework.ai.document.Document> documents = documentReader.get();
        List<Document> splitDocuments = TokenTextSplitter.builder()
            .build()
            .apply(documents);

        vectorStore.add(splitDocuments);

        return new FileUploadResponse(file.getOriginalFilename(), file.getContentType(), file.getSize());
    }


    /*
    @CrossOrigin
    @PostMapping("/new/userId/{userId}")
    public ResponseEntity<ChatDto> postNewChatFromUserId(@RequestBody MessageDto messageDto, @PathVariable String userId) {
        return ResponseEntity.ok(chatService.createNewChatFromUserId(messageDto, userId));
    }
     */

    // Post message to existing chat without user id (for testing)
    //@CrossOrigin
    @PostMapping("/chatId/{chatId}")
    public ResponseEntity<ChatResponse> postMessage(@RequestBody ChatRequest chatRequest, @PathVariable String chatId) {
        return ResponseEntity.ok(chatService.createNewMessageToExistingChat(chatRequest, chatId));
    }

    /*
    @CrossOrigin
    @PostMapping("/userId/{userId}/chatId/{chatId}")
    public ResponseEntity<MessageDto> postMessageFromUserId(@RequestBody MessageDto messageDto, @PathVariable String userId, @PathVariable String chatId) {
        return ResponseEntity.ok(chatService.createNewMessageFromUserId(messageDto, userId, chatId));
    }
     */


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PUT
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //@CrossOrigin
    @PutMapping("/edit/messageId/{messageId}")
    public ResponseEntity<ChatResponse> putMessageFromId(@PathVariable String messageId, @RequestBody ChatRequest chatRequest) {
        return ResponseEntity.ok(chatService.putMessageFromId(messageId, chatRequest));
    }

    //@CrossOrigin
    @PutMapping("/edit/chatId/{chatId}")
    public ResponseEntity<ChatTitleDto> putChatFromId(@PathVariable String chatId, @RequestBody String newTitle) {
        return ResponseEntity.ok(chatService.putChatTitleFromId(chatId, newTitle));
    }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DELETE
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //@CrossOrigin
    @DeleteMapping("/delete/all")
    public ResponseEntity<Void> deleteAllChats() {
        return ResponseEntity.ok(chatService.deleteAllChats());
    }

    /*
    @CrossOrigin
    @DeleteMapping("/delete/userId/{userId}")
    public ResponseEntity<Void> deleteAllChatsFromUserId(@PathVariable String userId) {
        return ResponseEntity.ok(chatService.deleteAllChatsFromUserId(userId));
    }
     */

    //@CrossOrigin
    @DeleteMapping("/delete/chatId/{chatId}")
    public ResponseEntity<Void> deleteChatFromId(@PathVariable String chatId) {
        return ResponseEntity.ok(chatService.deleteChatFromId(chatId));
    }

    //@CrossOrigin
    @DeleteMapping("/delete/messageId/{messageId}")
    public ResponseEntity<Void> deleteMessageFromId(@PathVariable String messageId) {
        return ResponseEntity.ok(chatService.deleteMessageFromId(messageId));
    }
}
