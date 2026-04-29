import { useState } from "react";
import { ChartBarIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import { useThemeContext } from "../../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import mermaid from "mermaid";
import CodeBlock from "./CodeBlock";

interface MermaidBlockProps {
  chart: string;
}

type ViewMode = "diagram" | "code";

const MermaidBlock = ({ chart }: MermaidBlockProps) => {
  const { theme } = useThemeContext();
  const { t } = useTranslation("chat");
  const [svg, setSvg] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("diagram");
  const isDark = theme === "kristiania-dark";

  const handleToggle = async (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    const isOpen = e.currentTarget.open;

    if (isOpen && !hasOpened && viewMode === "diagram") {
      setHasOpened(true);
      setIsLoading(true);
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "neutral",
        });
        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        const { svg: rendered } = await mermaid.render(id, chart);
        setSvg(rendered);
      } catch (err) {
        console.error("Mermaid render error:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <details
      className="collapse collapse-arrow bg-base-300 rounded-lg shadow-sm border border-base-300 my-2"
      onToggle={handleToggle}
    >
      <summary className="collapse-title text-sm text-base-content flex items-center gap-2">
        <ChartBarIcon className="w-4 h-4" aria-hidden="true" />
        {t("showDiagram")}
      </summary>

      <div className="collapse-content flex flex-col gap-2">
        {/* View mode toggle */}
        <div className="flex items-center gap-2 pt-2 text-sm text-base-content/60">
          <ChartBarIcon className="w-4 h-4" />
          <span>{t("diagram")}</span>
          <input
            type="checkbox"
            className="toggle toggle-sm"
            checked={viewMode === "code"}
            onChange={(e) => setViewMode(e.target.checked ? "code" : "diagram")}
          />
          <CodeBracketIcon className="w-4 h-4" />
          <span>{t("code")}</span>
        </div>

        {/* Diagram view */}
        {viewMode === "diagram" && (
          <div>
            {isLoading ? (
              <div className="w-full h-48 skeleton" />
            ) : svg ? (
              <div
                className="flex justify-center"
                // Gjør diagrammet tilgjengelig for skjermlesere
                role="img"
                aria-label={`Mermaid diagram: ${chart}`}
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            ) : null}
          </div>
        )}

        {/* Code view */}
        {viewMode === "code" && (
          <div
            // Skjermlesere kan lese koden direkte
            role="region"
            aria-label={t("diagramCode")}
          >
            <CodeBlock language="mermaid">{chart}</CodeBlock>
          </div>
        )}
      </div>
    </details>
  );
};

export default MermaidBlock;
