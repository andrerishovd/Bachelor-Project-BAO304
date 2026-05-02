export interface ILanguage {
  value: string;
  labelKey: string;
  flagCode: string; // flag-icons kode
}

export const LANGUAGES: ILanguage[] = [
  { value: "no", labelKey: "languageNorwegian", flagCode: "no" },
  { value: "en", labelKey: "languageEnglish", flagCode: "gb" },
];
