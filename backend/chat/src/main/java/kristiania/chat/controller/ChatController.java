package kristiania.chat.controller;

import kristiania.chat.dto.ChatDto;
import kristiania.chat.dto.ChatTitleDto;
import kristiania.chat.dto.MessageDto;
import kristiania.chat.modules.ChatRequest;
import kristiania.chat.modules.ChatResponse;
import kristiania.chat.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    //Get all chats
    @GetMapping("/all")
    public ResponseEntity<List<ChatDto>> getAllChats() {
        return ResponseEntity.ok(chatService.getAllChats());
    }

    //Get all chats
    @GetMapping("/all/title")
    public ResponseEntity<List<ChatTitleDto>> getAllChatTitles() {
        return ResponseEntity.ok(chatService.getAllChatTitlesAndId());
    }

    // Get all chat id's + titles from user id
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ChatTitleDto>> getAllChatsFromUser(@PathVariable String userId) {
        return ResponseEntity.ok(chatService.getAllChatsFromUser(userId));
    }

    // Get chat with chat id
    @GetMapping("/chatId/{chatId}")
    public ResponseEntity<ChatDto> getChatFromId(@PathVariable String chatId) {
        return ResponseEntity.ok(chatService.getChatWithId(chatId));
    }

    // Get message from id
    @GetMapping("/message/{messageId}")
    public ResponseEntity<MessageDto> getMessageFromId(@PathVariable String messageId) {
        return ResponseEntity.ok(chatService.getMessageFromId(messageId));
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // POST
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Post new chat without user (for testing)
    @PostMapping()
    public ChatResponse postMessageAndCreateNewChat(@RequestBody ChatRequest request) {
        if (request == null || request.getMessage() == null || request.getMessage().isBlank()) {
            return new ChatResponse("Please send a non-empty message.");
        }
        return chatService.createNewChatFromChatRequest(request);
    }

    // Post new chat with user id
    @PostMapping("/user/{userId}")
    public ResponseEntity<ChatDto> postNewChatFromUserId(@RequestBody MessageDto messageDto, @PathVariable String userId) {
        return ResponseEntity.ok(chatService.createNewChatFromUserId(messageDto, userId));
    }

    // Post message to existing chat without user (for testing)
    @PostMapping("/new")
    public ResponseEntity<MessageDto> postMessage(@RequestBody MessageDto messageDto) {
        return ResponseEntity.ok(chatService.createNewMessage(messageDto));
    }

    // Post message to existing chat with user id
    @PostMapping("/user/{userId}/chat/{chatId}")
    public ResponseEntity<MessageDto> postMessageFromUserId(@RequestBody MessageDto messageDto, @PathVariable String userId, @PathVariable String chatId) {
        return ResponseEntity.ok(chatService.createNewMessageFromUserId(messageDto, userId, chatId));
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // PUT
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Put/update message from id
    @PutMapping("/message/{messageId}")
    public ResponseEntity<MessageDto> putMessageFromId(@PathVariable String messageId) {
        return ResponseEntity.ok(chatService.putMessageFromId(messageId));
    }

    // Put/update message from id
    @PutMapping("/chatId/{chatId}")
    public ResponseEntity<MessageDto> putChatFromId(@PathVariable String chatId) {
        return ResponseEntity.ok(chatService.putChatFromId(chatId));
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // DELETE
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Delete all chats - also deletes messages in each chat
    @DeleteMapping()
    public ResponseEntity<Void> deleteAllChats() {
        return ResponseEntity.ok(chatService.deleteAllChats());
    }

    // Delete all chats from user id - also deletes messages in each chat
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Void> deleteAllChatsFromUserId(@PathVariable String userId) {
        return ResponseEntity.ok(chatService.deleteAllChatsFromUserId(userId));
    }

    // Delete chat from id - also deletes messages in this chat
    @DeleteMapping("/chatId/{chatId}")
    public ResponseEntity<Void> deleteChatFromId(@PathVariable String chatId) {
        return ResponseEntity.ok(chatService.deleteChatFromId(chatId));
    }

    // Delete message from id
    @DeleteMapping("/messageId/{messageId}")
    public ResponseEntity<Void> deleteMessageFromId(@PathVariable String messageId) {
        return ResponseEntity.ok(chatService.deleteMessageFromId(messageId));
    }
}
