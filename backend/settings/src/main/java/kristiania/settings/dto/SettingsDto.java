package kristiania.settings.dto;

import kristiania.settings.enums.Theme;

public record SettingsDto(
        String id,
        String language,
        Theme theme,
        String userId,
        String fontSize

) {
}
