package kristiania.chat.controller;

import kristiania.chat.dto.ChatDto;
import kristiania.chat.dto.ChatTitleDto;
import kristiania.chat.dto.MessageDto;
import kristiania.chat.modules.ChatRequest;
import kristiania.chat.modules.ChatResponse;
import kristiania.chat.service.ChatService;
import kristiania.chat.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;
    private final MessageService messageService;

    @Autowired
    public ChatController(ChatService chatService, MessageService messageService) {
        this.chatService = chatService;
        this.messageService = messageService;
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // GET
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Get all chats
    @CrossOrigin
    @GetMapping("/all")
    public ResponseEntity<List<ChatDto>> getAllChats() {
        return ResponseEntity.ok(chatService.getAllChats());
    }

    //Get all chatsTitleDto
    @CrossOrigin
    @GetMapping("/all/title")
    public ResponseEntity<List<ChatTitleDto>> getAllChatTitles() {
        return ResponseEntity.ok(chatService.getAllChatTitles());
    }

    // Get all chat id's + titles from user id
    @CrossOrigin
    @GetMapping("/all/title/userId/{userId}")
    public ResponseEntity<List<ChatTitleDto>> getAllChatTitlesFromUser(@PathVariable String userId) {
        return ResponseEntity.ok( chatService.getAllChatTitlesFromUser(userId) );
    }

    // Get all chats from user id
    @CrossOrigin
    @GetMapping("/userId/{userId}")
    public ResponseEntity<List<ChatTitleDto>> getAllChatsFromUser(@PathVariable String userId) {
        return ResponseEntity.ok(chatService.getAllChatsFromUser(userId));
    }

    // Get chat and all messages with chat id
    @CrossOrigin
    @GetMapping("/chatId/{chatId}")
    public ResponseEntity<ChatDto> getChatFromId(@PathVariable String chatId) {
        return ResponseEntity.ok(chatService.getChatWithId(chatId));
    }

    // Get message from id
    @CrossOrigin
    @GetMapping("/messageId/{messageId}")
    public ResponseEntity<MessageDto> getMessageFromId(@PathVariable String messageId) {
        return ResponseEntity.ok(chatService.getMessageFromId(messageId));
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // POST
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Post new chat without user id (for testing)
    @CrossOrigin
    @PostMapping()
    public ChatResponse postMessageAndCreateNewChat(@RequestBody ChatRequest request) {
        if (request == null || request.getMessage() == null || request.getMessage().isBlank()) {
            return new ChatResponse("Please send a non-empty message.");
        }
        return chatService.createNewChatFromChatRequest(request);
    }

    // Post new chat with user id
    @CrossOrigin
    @PostMapping("/userId/{userId}")
    public ResponseEntity<ChatDto> postNewChatFromUserId(@RequestBody MessageDto messageDto, @PathVariable String userId) {
        return ResponseEntity.ok(chatService.createNewChatFromUserId(messageDto, userId));
    }

    // Post message to existing chat without user id (for testing)
    @CrossOrigin
    @PostMapping("/chatId/{chatId}")
    public ResponseEntity<ChatResponse> postMessage(@RequestBody ChatRequest chatRequest, @PathVariable String chatId) {
        return ResponseEntity.ok(chatService.createNewMessageToExistingChat(chatRequest, chatId));
    }

    // Post message to existing chat with user id
    @CrossOrigin
    @PostMapping("/userId/{userId}/chatId/{chatId}")
    public ResponseEntity<MessageDto> postMessageFromUserId(@RequestBody MessageDto messageDto, @PathVariable String userId, @PathVariable String chatId) {
        return ResponseEntity.ok(chatService.createNewMessageFromUserId(messageDto, userId, chatId));
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // PUT
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Put/update message from id
    @CrossOrigin
    @PutMapping("/messageId/{messageId}")
    public ResponseEntity<Void> putMessageFromId(@PathVariable String messageId) {
        return ResponseEntity.ok(messageService.putMessageFromId(messageId));
    }

    // Put/update chat title from id
    @CrossOrigin
    @PutMapping("/chatId/{chatId}")
    public ResponseEntity<Void> putChatFromId(@PathVariable String chatId, @RequestBody String newTitle) {
        return ResponseEntity.ok(chatService.putChatTitleFromId(chatId, newTitle));
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // DELETE
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Delete all chats - also deletes messages in each chat
    @CrossOrigin
    @DeleteMapping()
    public ResponseEntity<Void> deleteAllChats() {
        return ResponseEntity.ok(chatService.deleteAllChats());
    }

    // Delete all chats from user id - also deletes messages in each chat
    @CrossOrigin
    @DeleteMapping("/userId/{userId}")
    public ResponseEntity<Void> deleteAllChatsFromUserId(@PathVariable String userId) {
        return ResponseEntity.ok(chatService.deleteAllChatsFromUserId(userId));
    }

    // Delete chat from id - also deletes messages in this chat
    @CrossOrigin
    @DeleteMapping("/chatId/{chatId}")
    public ResponseEntity<Void> deleteChatFromId(@PathVariable String chatId) {
        return ResponseEntity.ok(chatService.deleteChatFromId(chatId));
    }

    // Delete message from id
    @CrossOrigin
    @DeleteMapping("/messageId/{messageId}")
    public ResponseEntity<Void> deleteMessageFromId(@PathVariable String messageId) {
        return ResponseEntity.ok(chatService.deleteMessageFromId(messageId));
    }
}
