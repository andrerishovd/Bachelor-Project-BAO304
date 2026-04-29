// src/hooks/useSettings.ts
import { useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";
import {
  SettingsService,
  LANGUAGE_MAP,
  LANGUAGE_MAP_REVERSE,
} from "../services/SettingsService";
import { useFontSizeContext } from "../contexts/FontSizeContext";
import { useThemeContext } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

/**
 * useSettings
 *
 * Loads settings from backend on mount and saves them when they change.
 * Syncs theme, font size and language between frontend and backend.
 */
const useSettings = () => {
  const userId = localStorage.getItem("internalUserId");
  const { fontSize, setFontSize, reset } = useFontSizeContext();
  const { theme, setCustomTheme, followSystem } = useThemeContext();
  const { i18n } = useTranslation();

  // Last inn innstillinger fra backend ved mount
  useEffect(() => {
    if (!userId) return;

    const load = async () => {
      try {
        const settings = await SettingsService.getSettings(Number(userId));

        // Sett tema
        const frontendTheme = SettingsService.fromApiTheme(settings.theme);
        if (frontendTheme) {
          setCustomTheme(frontendTheme);
        } else {
          followSystem();
        }

        // Sett font size
        setFontSize(Number(settings.fontSize));

        // Sett språk
        const lang =
          LANGUAGE_MAP_REVERSE[
            settings.language as keyof typeof LANGUAGE_MAP_REVERSE
          ];
        if (lang) i18n.changeLanguage(lang);
      } catch (err) {
        console.error("Kunne ikke laste innstillinger:", err);
      }
    };

    load();
  }, [userId]);

  // Lagre innstillinger til backend
  const saveSettings = useCallback(async () => {
    if (!userId) return;

    try {
      await SettingsService.saveSettings({
        userId: Number(userId),
        fontSize: String(fontSize),
        theme: SettingsService.toApiTheme(theme),
        language:
          LANGUAGE_MAP[i18n.language as keyof typeof LANGUAGE_MAP] ??
          "norwegian",
      });
    } catch (err) {
      console.error("Kunne ikke lagre innstillinger:", err);
    }
  }, [userId, fontSize, theme, i18n.language]);

  const resetSettings = useCallback(async () => {
    reset();
    followSystem();
    i18n.changeLanguage("no");
    await saveSettings();
  }, []);

  return { saveSettings, resetSettings };
};

export default useSettings;
