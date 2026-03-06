package kristiania.chat.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record ChatDto(
        String id,
        String title,
        String userId,
        List<MessageDto> messageDtoList
) {}
