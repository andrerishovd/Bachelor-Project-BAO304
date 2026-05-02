import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { THEMES, FOLLOW_SYSTEM_KEY } from "../config/themes";

interface ThemeContextType {
  theme: string | null;
  themeLabelKey: string;
  toggleTheme: () => void;
  setCustomTheme: (theme: string) => void;
  followSystem: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string | null>(null);

  const themeLabelKey = theme
    ? (THEMES.find((t) => t.value === theme)?.labelKey ?? theme)
    : "themeFollowSystem";

  /*   useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []); */

  const toggleTheme = () => {
    const newTheme =
      theme === "kristiania-light" ? "kristiania-dark" : "kristiania-light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const setCustomTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const followSystem = () => {
    setTheme(null);
    document.documentElement.removeAttribute("data-theme");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeLabelKey,
        toggleTheme,
        setCustomTheme,
        followSystem,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useThemeContext must be used within ThemeProvider");
  return context;
};
