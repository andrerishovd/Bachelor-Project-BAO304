import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type FC,
  type ReactNode,
} from "react";

const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 24;
const DEFAULT_FONT_SIZE = 16;

/**
 * IFontSizeContext
 *
 * Provides global font size state and controls.
 *
 * @property fontSize - Current font size in pixels
 * @property setFontSize - Sets font size directly
 * @property reset - Resets font size to default (16px)
 * @property min - Minimum allowed font size
 * @property max - Maximum allowed font size
 */
interface IFontSizeContext {
  fontSize: number;
  setFontSize: (size: number) => void;
  reset: () => void;
  min: number;
  max: number;
}

interface IProps {
  children: ReactNode;
}

export const FontSizeContext = createContext<IFontSizeContext | null>(null);

/**
 * FontSizeProvider
 *
 * Applies the selected font size to the document root element,
 * which allows all rem-based sizing in the app to scale accordingly.
 * Persists the user's preference in localStorage.
 *
 * @param children - Child components that need access to font size state
 */
export const FontSizeProvider: FC<IProps> = ({ children }) => {
  const [fontSize, setFontSizeState] = useState<number>(() => {
    const stored = localStorage.getItem("fontSize");
    return stored ? Number(stored) : DEFAULT_FONT_SIZE;
  });

  // Applies font size to <html> so all rem units scale with it
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem("fontSize", String(fontSize));
  }, [fontSize]);

  const setFontSize = useCallback((size: number) => {
    const clamped = Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, size));
    setFontSizeState(clamped);
  }, []);

  const reset = useCallback(() => setFontSizeState(DEFAULT_FONT_SIZE), []);

  return (
    <FontSizeContext.Provider
      value={{
        fontSize,
        setFontSize,
        reset,
        min: MIN_FONT_SIZE,
        max: MAX_FONT_SIZE,
      }}
    >
      {children}
    </FontSizeContext.Provider>
  );
};

/**
 * useFontSizeContext
 *
 * Custom hook for consuming FontSizeContext.
 * Must be used within a FontSizeProvider.
 *
 * @returns FontSizeContext value: { fontSize, setFontSize, reset, min, max }
 * @throws Error if used outside of FontSizeProvider
 *
 * @example
 * const { fontSize, setFontSize } = useFontSizeContext();
 */
export const useFontSizeContext = () => {
  const context = useContext(FontSizeContext);
  if (!context)
    throw new Error("useFontSizeContext must be used within FontSizeProvider");
  return context;
};
