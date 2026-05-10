package kristiania.chat.dto;

import java.util.List;

public record OpenAiResponseDto(
        List<OutputItemDto> output
) {
}
