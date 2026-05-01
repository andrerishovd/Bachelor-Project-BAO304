import { useEffect, useCallback } from "react";
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
 * Custom hook for loading and saving user settings via the backend API.
 * Synchronizes theme, font size, and language between the frontend state
 * and the backend on mount and on save.
 *
 * Settings are loaded automatically when the hook mounts, provided that
 * an internal user ID exists in localStorage (set on LOGIN_SUCCESS).
 *
 * @returns
 * - saveSettings: Persists current settings to the backend
 * - resetSettings: Resets all settings to defaults and saves them
 *
 * @example
 * const { saveSettings, resetSettings } = useSettings();
 * await saveSettings(); // call on modal close with save
 */
const useSettings = () => {
  const userId = localStorage.getItem("internalUserId");
  const { fontSize, setFontSize, reset } = useFontSizeContext();
  const { theme, setCustomTheme, followSystem } = useThemeContext();
  const { i18n } = useTranslation();

  // Load settings from backend on mount
  useEffect(() => {
    if (!userId) return;

    const load = async () => {
      try {
        const settings = await SettingsService.getSettings(Number(userId));

        // Apply theme
        const frontendTheme = SettingsService.fromApiTheme(settings.theme);
        if (frontendTheme) {
          setCustomTheme(frontendTheme);
        } else {
          followSystem();
        }

        // Apply font size
        setFontSize(Number(settings.fontSize));

        // Apply language
        const lang =
          LANGUAGE_MAP_REVERSE[
            settings.language as keyof typeof LANGUAGE_MAP_REVERSE
          ];
        if (lang) i18n.changeLanguage(lang);
      } catch (err) {
        console.error("Failed to load settings:", err);
      }
    };

    load();
  }, [userId]);

  /**
   * Persists the current theme, font size, and language to the backend.
   * Should be called when the user explicitly saves their settings.
   */
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
      console.error("Failed to save settings:", err);
    }
  }, [userId, fontSize, theme, i18n.language]);

  /**
   * Resets all settings to their defaults and persists them to the backend.
   * Defaults: font size 16px, follow system theme, Norwegian language.
   */
  const resetSettings = useCallback(async () => {
    reset();
    followSystem();
    i18n.changeLanguage("no");
    await saveSettings();
  }, []);

  return { saveSettings, resetSettings };
};

export default useSettings;
