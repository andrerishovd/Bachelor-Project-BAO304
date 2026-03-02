package kristiania.chat.service;

import kristiania.chat.dto.ChatDto;
import kristiania.chat.dto.ChatTitleDto;
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
import java.util.List;

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    @Test
    public void ChatService_GetAllChatsDto_ReturnsListChatDto() {
        Chat savedChat = Chat.builder()
                .id(1L)
                .title("what is 1+1?")
                .userId("14")
                .messageList(new ArrayList<>())
                .build();

        Chat savedChat2 = Chat.builder()
                .id(2L)
                .title("What are microservices?")
                .userId("14")
                .messageList(new ArrayList<>())
                .build();

        List<Chat> chatList = new ArrayList<>();
        chatList.add(savedChat);
        chatList.add(savedChat2);

        when(chatRepository.findAll()).thenReturn(chatList);

        List<ChatDto> chatDtoList = chatService.getAllChatsDto();

        Assertions.assertThat(chatDtoList).isNotNull();
        Assertions.assertThat(chatDtoList).isNotEmpty();
        Assertions.assertThat(chatDtoList.size()).isEqualTo(2);
        Assertions.assertThat(chatDtoList.get(0)).isNotEqualTo(chatDtoList.get(1));
        Assertions.assertThat(chatDtoList.get(0).id()).isNotEqualTo(chatDtoList.get(1).id());
    }

    @Test
    public void ChatService_GetAllTitlesDto_ReturnsListChatTitleDto() {
        Chat savedChat = Chat.builder()
                .id(1L)
                .title("what is 1+1?")
                .userId("14")
                .messageList(new ArrayList<>())
                .build();

        Chat savedChat2 = Chat.builder()
                .id(2L)
                .title("What are microservices?")
                .userId("14")
                .messageList(new ArrayList<>())
                .build();

        List<Chat> chatList = new ArrayList<>();
        chatList.add(savedChat);
        chatList.add(savedChat2);

        when(chatRepository.findAll()).thenReturn(chatList);

        List<ChatTitleDto> chatTitleDtoList = chatService.getAllChatTitlesDto();

        Assertions.assertThat(chatTitleDtoList).isNotNull();
        Assertions.assertThat(chatTitleDtoList).isNotEmpty();
        Assertions.assertThat(chatTitleDtoList.size()).isEqualTo(2);
        Assertions.assertThat(chatTitleDtoList.get(0)).isNotEqualTo(chatTitleDtoList.get(1));
        Assertions.assertThat(chatTitleDtoList.get(0).id()).isNotEqualTo(chatTitleDtoList.get(1).id());
        Assertions.assertThat(chatTitleDtoList.get(0).id()).isNotNull();
        Assertions.assertThat(chatTitleDtoList.get(1).id()).isNotNull();
    }

    @Test
    public void ChatService_GetChatDtoFromId_ReturnsChatDto() {
        Long id = 1L;

        Chat savedChat = Chat.builder()
                .id(id)
                .title("what is 1+1?")
                .userId("14")
                .messageList(new ArrayList<>())
                .build();

        when(chatRepository.getReferenceById(Mockito.eq(id))).thenReturn(savedChat);

        ChatDto chatDto = chatService.getChatDtoFromId(id.toString());

        Assertions.assertThat(chatDto).isNotNull();
        Assertions.assertThat(Long.valueOf(chatDto.id())).isEqualTo(id);

    }

    @Test
    public void ChatService_GetMessageDtoFromId_ReturnsMessageDto() {

    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POST
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    @Test
    public void ChatService_CreateNewMessageToExistingChat_ReturnsChatResponse() {

    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PUT
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    @Test
    public void ChatService_PutChatTitleFromId_ReturnsChatTitleDto() {

    }

    @Test
    public void ChatService_PutChatMessageFromId_ReturnsChatResponse() {

    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DELETE
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    @Test
    public void ChatService_DeleteAllChats_ReturnsVoid() {

    }

    @Test
    public void ChatService_DeleteChatFromId_ReturnsVoid() {

    }

    @Test
    public void ChatService_DeleteMessageFromId_ReturnsVoid() {

    }
}
