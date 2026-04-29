package kristiania.settings.controller;

import kristiania.settings.dto.SettingsDto;
import kristiania.settings.modules.Settings;
import kristiania.settings.service.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/settings")
public class SettingsController {

    private final SettingsService settingsService;

    @Autowired
    public SettingsController(SettingsService settingsService) {
        this.settingsService = settingsService;
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<Settings> getSettingsFromUserId(@PathVariable String userId){
        return ResponseEntity.ok(settingsService.getSettingsByUser(userId));
    }
    @PostMapping
    public ResponseEntity<Settings> saveSettingsDto(@RequestBody SettingsDto settingsDto){
        return ResponseEntity.ok(settingsService.saveSettingsDto(settingsDto));
    }

}
