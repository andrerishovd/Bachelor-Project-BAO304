package kristiania.settings.service;

import kristiania.settings.dto.SettingsDto;
import kristiania.settings.modules.Settings;
import kristiania.settings.repository.SettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SettingsService {
    private final SettingsRepository settingsRepository;

    private Settings saveNewSettings(Settings settings){
        return settingsRepository.save(settings);
    }

    public Settings getSettingsByUser(String userId) {
        Long id = Long.valueOf(userId);
        return settingsRepository.getReferenceById(id);
    }
    public Settings saveSettings(Settings settings) {
        return settingsRepository.save(settings);
    }
    public Settings saveSettingsDto(SettingsDto settingsDto){

        Settings settings = Settings.builder()
            .theme(settingsDto.theme())
            .fontSize(settingsDto.fontSize())
            .language(settingsDto.language())
            .userId(Long.valueOf(settingsDto.userId()))
            .build();

        return settingsRepository.save(settings);
    }
    public Settings saveSettingsByUser(Settings settings) {
        // GET THE USERS ID VIA API.
        return settingsRepository.save(settings);
        // DELETE USERS PREVIOUS SETTING.
    }
}
