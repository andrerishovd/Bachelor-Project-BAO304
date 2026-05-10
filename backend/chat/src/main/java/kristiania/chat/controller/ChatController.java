package kristiania.chat.controller;

import kristiania.chat.dto.ChatDto;
import kristiania.chat.dto.ChatTitleDto;
import kristiania.chat.dto.MessageDto;
import kristiania.chat.modules.ChatRequest;
import kristiania.chat.modules.ChatResponse;
import kristiania.chat.modules.FileUploadResponse;
import kristiania.chat.modules.MultipartFileUploadResponse;
import kristiania.chat.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    @GetMapping("/all")
    public ResponseEntity<List<ChatDto>> getAllChats() {
        return ResponseEntity.ok(chatService.getAllChatsDto());
    }

    @GetMapping("/all/title")
    public ResponseEntity<List<ChatTitleDto>> getAllChatTitles() {
        return ResponseEntity.ok(chatService.getAllChatTitlesDto());
    }

    /*
    @GetMapping("/all/title/userId/{userId}")
    public ResponseEntity<List<ChatTitleDto>> getAllChatTitlesFromUser(@PathVariable String userId) {
        return ResponseEntity.ok( chatService.getAllChatTitlesFromUser(userId) );
    }
    */

    /*
    @GetMapping("/userId/{userId}")
    public ResponseEntity<List<ChatTitleDto>> getAllChatsFromUser(@PathVariable String userId) {
        return ResponseEntity.ok(chatService.getAllChatsFromUser(userId));
    }
     */

    @GetMapping("/chatId/{chatId}")
    public ResponseEntity<ChatDto> getChatFromId(@PathVariable String chatId) {
        return ResponseEntity.ok(chatService.getChatDtoFromId(chatId));
    }

    @GetMapping("/messageId/{messageId}")
    public ResponseEntity<MessageDto> getMessageFromId(@PathVariable String messageId) {
        return ResponseEntity.ok(chatService.getMessageDtoFromId(messageId));
    }

    @GetMapping("/downloadZip/courseId/{courseId}")
    public ResponseEntity<Void> getZipFromCanvasTemp(@PathVariable String courseId) {
        return ResponseEntity.ok(chatService.getZipFromCanvasTemp(courseId));
    }

    @GetMapping("/uploadFromCourseMaterials/courseId/{courseId}")
    public List<FileUploadResponse> uploadFromCourseMaterial(@PathVariable String courseId) {
        return chatService.uploadFromCourseMaterial(courseId);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POST
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Post new chat without user id
    @PostMapping("/new")
    @Transactional(timeout = 120)
    public ChatResponse postMessageAndCreateNewChat(@RequestBody ChatRequest request) {
        if (request == null || request.getMessage() == null || request.getMessage().isBlank()) {
            return new ChatResponse(null, "Please send a non-empty message.");
        }
        return chatService.createNewChatFromChatRequest(request);
    }

    // based on https://howtodoinjava.com/spring-ai/chatbot-example-with-rag/
    @PostMapping("/uploadSingleFile")
    public MultipartFileUploadResponse uploadDocument(@RequestParam("file") MultipartFile file) {
        if (file == null) {
            return new MultipartFileUploadResponse("No file detected", null, null);
        }
        return chatService.uploadDocument(file);
    }

    /*
    @PostMapping("/new/userId/{userId}")
    public ResponseEntity<ChatDto> postNewChatFromUserId(@RequestBody MessageDto messageDto, @PathVariable String userId) {
        return ResponseEntity.ok(chatService.createNewChatFromUserId(messageDto, userId));
    }
    */

    // Post message to existing chat without user id
    @PostMapping("/chatId/{chatId}")
    @Transactional(timeout = 120)
    public ResponseEntity<ChatResponse> postMessage(@RequestBody ChatRequest chatRequest, @PathVariable String chatId) {
        return ResponseEntity.ok(chatService.createNewMessageToExistingChat(chatRequest, chatId));
    }

    /*
    @PostMapping("/userId/{userId}/chatId/{chatId}")
    public ResponseEntity<MessageDto> postMessageFromUserId(@RequestBody MessageDto messageDto, @PathVariable String userId, @PathVariable String chatId) {
        return ResponseEntity.ok(chatService.createNewMessageFromUserId(messageDto, userId, chatId));
    }
     */

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PUT
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    @PutMapping("/edit/messageId/{messageId}")
    public ResponseEntity<ChatResponse> putMessageFromId(@PathVariable String messageId, @RequestBody ChatRequest chatRequest) {
        return ResponseEntity.ok(chatService.putMessageFromId(messageId, chatRequest));
    }

    @PutMapping("/edit/chatId/{chatId}")
    public ResponseEntity<ChatTitleDto> putChatFromId(@PathVariable String chatId, @RequestBody String newTitle) {
        return ResponseEntity.ok(chatService.putChatTitleFromId(chatId, newTitle));
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DELETE
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    @DeleteMapping("/delete/all")
    public ResponseEntity<Void> deleteAllChats() {
        return ResponseEntity.ok(chatService.deleteAllChats());
    }

    /*
    @DeleteMapping("/delete/userId/{userId}")
    public ResponseEntity<Void> deleteAllChatsFromUserId(@PathVariable String userId) {
        return ResponseEntity.ok(chatService.deleteAllChatsFromUserId(userId));
    }
     */

    @DeleteMapping("/delete/chatId/{chatId}")
    public ResponseEntity<Void> deleteChatFromId(@PathVariable String chatId) {
        return ResponseEntity.ok(chatService.deleteChatFromId(chatId));
    }

    @DeleteMapping("/delete/messageId/{messageId}")
    public ResponseEntity<Void> deleteMessageFromId(@PathVariable String messageId) {
        return ResponseEntity.ok(chatService.deleteMessageFromId(messageId));
    }
}
