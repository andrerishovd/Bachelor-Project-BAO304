package kristiania.chat.service;

import kristiania.chat.dto.ChatDto;
import kristiania.chat.dto.ChatTitleDto;
import kristiania.chat.dto.MessageDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    public List<ChatTitleDto> getAllChats() {
        return null;
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

    public ChatDto createNewChat(MessageDto messageDto) {
        return null;
    }

    public ChatDto createNewChatFromUserId(MessageDto messageDto, String userId) {
        return null;
    }

    public MessageDto createNewMessage(MessageDto messageDto) {
        return null;
    }

    public MessageDto createNewMessageFromUserId(MessageDto messageDto, String userId) {
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
