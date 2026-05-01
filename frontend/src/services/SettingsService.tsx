import { apiClient } from "../config/axiosConfig";

export interface ISettings {
  fontSize: string;
  language: string;
  userId: number;
  theme: "KRISTIANIA_LIGHT" | "KRISTIANIA_DARK" | "FOLLOW_SYSTEM";
}

const THEME_MAP = {
  "kristiania-light": "KRISTIANIA_LIGHT",
  "kristiania-dark": "KRISTIANIA_DARK",
  null: "FOLLOW_SYSTEM",
} as const;

const THEME_MAP_REVERSE = {
  KRISTIANIA_LIGHT: "kristiania-light",
  KRISTIANIA_DARK: "kristiania-dark",
  FOLLOW_SYSTEM: null,
} as const;

export const LANGUAGE_MAP = {
  no: "norwegian",
  en: "english",
} as const;

export const LANGUAGE_MAP_REVERSE = {
  norwegian: "no",
  english: "en",
} as const;

export const SettingsService = {
  getSettings: async (userId: number): Promise<ISettings> => {
    const res = await apiClient.get(`/settings/user/${userId}`);
    return res.data;
  },

  saveSettings: async (settings: ISettings): Promise<void> => {
    await apiClient.post("/settings", settings);
  },

  toApiTheme: (theme: string | null) =>
    THEME_MAP[theme as keyof typeof THEME_MAP] ?? "FOLLOW_SYSTEM",

  fromApiTheme: (theme: string) =>
    THEME_MAP_REVERSE[theme as keyof typeof THEME_MAP_REVERSE] ?? null,
};
