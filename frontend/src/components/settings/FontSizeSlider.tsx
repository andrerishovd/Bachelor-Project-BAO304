import { useTranslation } from "react-i18next";
import { useFontSizeContext } from "../../contexts/FontSizeContext";

/**
 * FontSizeSlider
 *
 * Settings component for adjusting the global font size.
 * Displays a slider with current value and a reset button.
 *
 * @example
 * <FontSizeSlider />
 */
const FontSizeSlider = () => {
  const { t } = useTranslation("settings");
  const { fontSize, setFontSize, reset, min, max } = useFontSizeContext();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{t("fontSize")}</label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-base-content/60">{fontSize}px</span>
          <button onClick={reset} className="btn btn-xs btn-ghost">
            {t("reset")}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Small A indicator */}
        <span className="text-xs text-base-content/50">A</span>
        <input
          type="range"
          min={min}
          max={max}
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="range range-sm flex-1"
        />
        {/* Large A indicator */}
        <span className="text-lg text-base-content/50">A</span>
      </div>
    </div>
  );
};

export default FontSizeSlider;
