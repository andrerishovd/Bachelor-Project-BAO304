package kristiania.chat.service;

import kristiania.chat.dto.*;
import kristiania.chat.enums.SenderType;
import kristiania.chat.modules.Chat;
import kristiania.chat.modules.ChatRequest;
import kristiania.chat.modules.ChatResponse;
import kristiania.chat.modules.Message;
import kristiania.chat.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final  MessageService messageService;
    private final AiService aiService;

    public Long createChat(String title) {
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

    public ChatDto convertChatToChatDto(Chat chat) {
        List<MessageDto> messageDtoList = new ArrayList<>();

        for(Message message : chat.getMessageList()) {
            MessageDto messageDto = new MessageDto(message.getId().toString(), message.getBody(), message.getLocalDateTime().toString(), message.getSenderType().toString());
            messageDtoList.add(messageDto);
        }

        ChatDto chatDto = new ChatDto(
                chat.getId().toString(),
                chat.getTitle(),
                chat.getUserId(),
                messageDtoList
        );

        return chatDto;
    }

    public List<ChatDto> convertChatListToChatDtoList(List<Chat> chatList) {
        List<ChatDto> chatDtoList = new ArrayList<>();
        for(Chat chat : chatList) {
            chatDtoList.add(convertChatToChatDto(chat));
        }
        return chatDtoList;
    }

    public List<ChatDto> getAllChats() {
        List<Chat> chatList = chatRepository.findAll();

        return convertChatListToChatDtoList(chatList);
    }

    public List<ChatTitleDto> getAllChatTitlesAndId() {
        return new ArrayList<>();
    }

    public List<ChatTitleDto> getAllChatsFromUser(String userId) {
        return null;
    }

    /*
    public ChatDto getChatDtoWithId(String id) {
        //chatRepository.getReferenceById(String id);
        return null;
    }
     */

    public ChatDto getChatWithId(String stringId) {
        Long id = Long.valueOf(stringId);
        Chat chat= chatRepository.getReferenceById(id);

        return convertChatToChatDto(chat);
    }

    public MessageDto getMessageFromId(String messageId) {
        return null;
    }

    public ChatResponse createNewChatFromChatRequest(ChatRequest chatRequest) {
        Long newChatId = createChat(chatRequest.getMessage());
        Chat newChat = chatRepository.getReferenceById(newChatId);
        MessageDto messageDto = new MessageDto(null, chatRequest.getMessage(), null, SenderType.USER.toString());

        messageService.saveMessageDto(messageDto, newChat);

        ChatResponse chatResponse= aiService.sendChat(messageDto.body());
        MessageDto responseMessageDto = new MessageDto(null, chatResponse.getResponse(), null, SenderType.AI.toString());

        messageService.saveMessageDto(responseMessageDto, chatRepository.getReferenceById(newChatId));
        return chatResponse;
    }

    public ChatDto createNewChatFromUserId(MessageDto messageDto, String userId) {
        return null;
    }

    public MessageDto createNewMessage(ChatRequest chatRequest, Long chatId) {
        MessageDto messageDto = new MessageDto();



        return messageDto;
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
