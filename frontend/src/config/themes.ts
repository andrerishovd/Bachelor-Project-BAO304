export interface ITheme {
  value: string;
  labelKey: string;
}
/** Uncomment to enable more themes
 * Themes can be previewed here:
 * https://daisyui.com/docs/themes/#list-of-themes
 */

export const THEMES: ITheme[] = [
  { value: "kristiania", labelKey: "themeLight" },
  { value: "kristiania-dark", labelKey: "themeDark" },
  // { value: "light", labelKey: "themeDefaultLight" },
  // { value: "dark", labelKey: "themeDefaultDark" },
  // { value: "retro", labelKey: "themeRetro" },
  // { value: "cyberpunk", labelKey: "themeCyberpunk" },
  // { value: "synthwave", labelKey: "themeSynthwave" },
  // { value: "valentine", labelKey: "themeValentine" },
  // { value: "aqua", labelKey: "themeAqua" },
];

export const FOLLOW_SYSTEM_KEY = "themeFollowSystem";
