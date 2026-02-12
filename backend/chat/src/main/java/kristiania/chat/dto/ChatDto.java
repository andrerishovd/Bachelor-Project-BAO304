package kristiania.chat.dto;

import java.util.List;

public record ChatDto(String id, String title, String userId, List<MessageDto> messageDtoList) {
}
