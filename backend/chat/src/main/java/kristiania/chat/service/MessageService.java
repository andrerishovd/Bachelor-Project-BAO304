package kristiania.chat.service;

import kristiania.chat.dto.MessageDto;
import kristiania.chat.enums.SenderType;
import kristiania.chat.modules.Chat;
import kristiania.chat.modules.ChatRequest;
import kristiania.chat.modules.ChatResponse;
import kristiania.chat.modules.Message;
import kristiania.chat.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    public Message getMessageFromId(Long messageId) {
        Message message;
        try{
            message = messageRepository.findById(messageId).orElseThrow(() -> new RuntimeException("Message not found with id = " + messageId));;;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return message;
    }

    public void saveMessageDto(MessageDto messageDto, Chat chat) {

        // save message to that chat
        Message message = Message.builder()
                .body(messageDto.body())
                .localDateTime(LocalDateTime.now())
                .senderType(SenderType.valueOf(messageDto.senderType()))
                .senderId("22")
                .chat(chat)
                .build();

        messageRepository.save(message);
    }

    /*
    // make own service?
    public void saveMessage(Message message, Chat chat) {
        // save message to parameter chat
    }
     */

    public Message putMessageFromId(Message newMessage) {
        Message oldMessage, savedMessage = null;

        try {
            oldMessage = messageRepository.findById(newMessage.getId()).orElseThrow(() -> new RuntimeException("Message not found with id = " + newMessage.getId()));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        try {
            if(oldMessage != null) {
                savedMessage = messageRepository.save(newMessage);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return savedMessage;
    }

    public void deleteMessageFromId(String messageId) {
        messageRepository.deleteById(Long.valueOf(messageId));
    }

    public void deleteAllMessagesAfterDateTime(Chat chat, LocalDateTime localDateTime) {
        for(Message message : chat.getMessageList()) {
            if(message.getLocalDateTime().isAfter(localDateTime)) {
                messageRepository.deleteById(message.getId());
            }
        }
    }
}
