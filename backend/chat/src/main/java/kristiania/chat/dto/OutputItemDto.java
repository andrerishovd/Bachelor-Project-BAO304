package kristiania.chat.dto;

import java.util.List;

public record OutputItemDto(
        String type,
        List<ContentItemDto> content
) {
}
