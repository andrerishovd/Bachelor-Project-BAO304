package kristiania.chat.service;

import kristiania.chat.dto.ChatDto;
import kristiania.chat.dto.MessageDto;
import kristiania.chat.modules.Chat;
import kristiania.chat.modules.ChatRequest;
import kristiania.chat.modules.ChatResponse;
import kristiania.chat.repository.ChatRepository;
import kristiania.chat.repository.MessageRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ChatServiceTests {

    @Mock
    private ChatRepository chatRepository;
    @Mock
    private MessageService messageService;
    @Mock
    private MessageRepository messageRepository;
    @Mock
    private AiService aiService;

    @InjectMocks
    private ChatService chatService;

    @Test
    public void ChatService_CreateNewChatFromChatRequest_ReturnsChatResponse() {
        ChatRequest chatRequest = ChatRequest.builder()
                .message("what is 1+1?")
                .build();

        Chat savedChat = Chat.builder()
                .id(1L)
                .title("what is 1+1?")
                .userId("14")
                .messageList(new ArrayList<>())
                .build();

        ChatResponse chatResponse = ChatResponse.builder()
                .chatId(1L)
                .response("The answer is 2")
                .build();

        when(chatRepository.save(Mockito.any(Chat.class)))
                .thenReturn(savedChat);

        when(chatRepository.getReferenceById(1L))
                .thenReturn(savedChat);

        when(aiService.sendChat(Mockito.eq(1L), Mockito.anyString()))
                .thenReturn(chatResponse);

        ChatResponse newChatResponse = chatService.createNewChatFromChatRequest(chatRequest);

        Assertions.assertThat(newChatResponse).isNotNull();
        Assertions.assertThat(newChatResponse.getChatId()).isEqualTo(1L);
        Assertions.assertThat(newChatResponse.getResponse()).isEqualTo("The answer is 2");

        Mockito.verify(messageService, Mockito.times(2))
                .saveMessageDto(Mockito.any(MessageDto.class), Mockito.eq(savedChat));
    }
}
