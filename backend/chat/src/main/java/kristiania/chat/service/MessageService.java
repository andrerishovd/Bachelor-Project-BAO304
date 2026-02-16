package kristiania.chat.service;

import kristiania.chat.dto.MessageDto;
import kristiania.chat.enums.SenderType;
import kristiania.chat.modules.Chat;
import kristiania.chat.modules.Message;
import kristiania.chat.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

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

    // make own service?
    public void saveMessage(Message message, Chat chat) {
        // save message to parameter chat
    }


    public Void putMessageFromId(String messageId) {

        return null;
    }
}
