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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final  MessageService messageService;
    private final AiService aiService;

    public Long createChat(String title) {
        ArrayList<Message> messageList = new ArrayList<>();
        Chat chat = Chat.builder()
            .title(title)
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

    public List<ChatTitleDto> getAllChatTitles() {
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


        ChatResponse chatResponse;

        try {
            chatResponse = aiService.sendChat(newChatId, messageDto.body());

            MessageDto responseMessageDto = new MessageDto(null, chatResponse.getResponse(), null, SenderType.AI.toString());


            messageService.saveMessageDto(messageDto, newChat);
            messageService.saveMessageDto(responseMessageDto, chatRepository.getReferenceById(newChatId));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return chatResponse;
    }

    public ChatDto createNewChatFromUserId(MessageDto messageDto, String userId) {
        return null;
    }

    public ChatResponse createNewMessageToExistingChat(ChatRequest chatRequest, String chatIdString) {
        Long chatId = Long.valueOf(chatIdString);

        Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new RuntimeException("Chat not found with id = " + chatId));

        MessageDto messageDto = new MessageDto(null, chatRequest.getMessage(), null, SenderType.USER.toString());

        messageService.saveMessageDto(messageDto, chat);
        MessageDto responseMessageDto = sendMessageToAi(new ChatRequest(messageDto.body()), chat);
        messageService.saveMessageDto(responseMessageDto, chat);
        ChatResponse chatResponse = new ChatResponse(chatId, responseMessageDto.body());

        return chatResponse;
    }

    public MessageDto sendMessageToAi(ChatRequest chatRequest, Chat chat) {
        ChatResponse chatResponse= aiService.sendToExistingChat(chatRequest.getMessage(), chat);
        MessageDto responseMessageDto = new MessageDto(null, chatResponse.getResponse(), null, SenderType.AI.toString());

        return responseMessageDto;
    }

    public MessageDto createNewMessageFromUserId(MessageDto messageDto, String userId, String chatId) {
        return null;
    }

    public Void putChatTitleFromId(String chatId, String newTitle) {
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
        messageService.deleteMessageFromId(messageId);
        return null;
    }

    public List<ChatTitleDto> getAllChatTitlesFromUser(String userId) {
        return null;
    }

    public ChatResponse putMessageFromId(String messageId, ChatRequest chatRequest) {
        Message message = messageService.getMessageFromId(Long.valueOf(messageId));
        ChatResponse chatResponse = null;

        MessageDto responseMessageDto = sendMessageToAi(chatRequest, message.getChat());
        if(responseMessageDto != null) {
            messageService.deleteAllMessagesAfterDateTime(message.getChat(), message.getLocalDateTime());

            message.setBody(chatRequest.getMessage());
            message.setLocalDateTime(LocalDateTime.now());
            messageService.putMessageFromId(message);

            messageService.saveMessageDto(responseMessageDto, message.getChat());
            chatResponse = new ChatResponse(message.getChat().getId(), responseMessageDto.body());
        }

        return chatResponse;
    }
}
