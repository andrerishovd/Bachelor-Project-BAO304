package kristiania.chat.service;

import kristiania.chat.dto.*;
import kristiania.chat.enums.SenderType;
import kristiania.chat.modules.*;
import kristiania.chat.repository.ChatRepository;
import kristiania.chat.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final MessageService messageService;
    private final AiService aiService;
    private final MessageRepository messageRepository;
    private final FileService fileService;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INTERNAL TOOLS
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private Long createChat(String title) {
        ArrayList<Message> messageList = new ArrayList<>();
        Chat chat = Chat.builder()
            .title(title)
            .userId("11")
            .messageList(messageList)
            .build();

        Chat savedChat = chatRepository.save(chat);
        return savedChat.getId();
    }

    private ChatDto convertChatToChatDto(Chat chat) {
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

    private ChatTitleDto convertChatToChatTitleDto(Chat chat) {
        ChatTitleDto chatTitleDto = new ChatTitleDto(chat.getId().toString(), chat.getTitle());
        return chatTitleDto;
    }

    private List<ChatDto> convertChatListToChatDtoList(List<Chat> chatList) {
        List<ChatDto> chatDtoList = new ArrayList<>();
        for(Chat chat : chatList) {
            chatDtoList.add(convertChatToChatDto(chat));
        }
        return chatDtoList;
    }

    private List<ChatTitleDto> convertChatListToChatTitleDtoList(List<Chat> chatList) {
        List<ChatTitleDto> chatTitleDtoList = new ArrayList<>();
        for(Chat chat : chatList) {
            chatTitleDtoList.add(new ChatTitleDto(chat.getId().toString(), chat.getTitle()));
        }
        return chatTitleDtoList;
    }

    private MessageDto sendMessageToAi(ChatRequest chatRequest, Chat chat) {
        ChatResponse chatResponse= aiService.sendToExistingChat(chatRequest.getMessage(), chat);
        MessageDto responseMessageDto = new MessageDto(null, chatResponse.getResponse(), null, SenderType.AI.toString());

        return responseMessageDto;
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public List<ChatDto> getAllChatsDto() {
        List<Chat> chatList = chatRepository.findAll();
        return convertChatListToChatDtoList(chatList);
    }

    public List<ChatTitleDto> getAllChatTitlesDto() {
        List<Chat> chatList = chatRepository.findAll();
        List<ChatTitleDto> chatTitleDtoList = convertChatListToChatTitleDtoList(chatList);
        return chatTitleDtoList;
    }

    public ChatDto getChatDtoFromId(String stringId) {
        Long id = Long.valueOf(stringId);
        Chat chat= chatRepository.getReferenceById(id);

        return convertChatToChatDto(chat);
    }

    public MessageDto getMessageDtoFromId(String messageId) {
        Message message = messageService.getMessageFromId(Long.valueOf(messageId));
        MessageDto messageDto = new MessageDto(message.getId().toString(), message.getBody(), message.getLocalDateTime().toString(), message.getSenderType().toString());
        return messageDto;
    }

    public Void getZipFromCanvasTemp(String courseId) {
        fileService.getZippedFiles(courseId);
        return null;
    }

    public List<FileUploadResponse> uploadFromCourseMaterial(String courseId) {
        return aiService.uploadFolderToVectorDb(courseId);
    }

    /*
    public List<ChatTitleDto> getAllChatsFromUser(String userId) {
        return null;
    }

    public List<ChatTitleDto> getAllChatTitlesFromUser(String userId) {
        return null;
    }
     */

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POST
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
            return chatResponse;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
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

    public MultipartFileUploadResponse uploadDocument(MultipartFile file) {
        return aiService.uploadMultiPartFileToVectorDb(file);
    }

    /*
    public ChatDto createNewChatFromUserId(MessageDto messageDto, String userId) {
        return null;
    }

    public MessageDto createNewMessageFromUserId(MessageDto messageDto, String userId, String chatId) {
        return null;
    }
     */

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PUT
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public ChatTitleDto putChatTitleFromId(String chatId, String newTitle) {
        Chat chat = chatRepository.getReferenceById(Long.valueOf(chatId));
        chat.setTitle(newTitle);
        chatRepository.save(chat);
        ChatTitleDto chatTitleDto = convertChatToChatTitleDto(chat);
        return chatTitleDto;
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DELETE
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public Void deleteAllChats() {
        messageService.deleteAllMessages();
        chatRepository.deleteAll();
        return null;
    }

    /*
    public Void deleteAllChatsFromUserId(String userId) {
        return null;
    }
     */

    public Void deleteChatFromId(String chatId) {
        Chat chat = chatRepository.getReferenceById(Long.valueOf(chatId));
        for(Message message : chat.getMessageList()) {
            messageRepository.deleteById(message.getId());
        }
        chatRepository.deleteById(chat.getId());
        return null;
    }

    public Void deleteMessageFromId(String messageId) {
        messageService.deleteMessageFromId(messageId);
        return null;
    }

}
