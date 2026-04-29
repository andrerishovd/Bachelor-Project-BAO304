import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { useThemeContext } from "../../../contexts/ThemeContext";

interface MermaidBlockProps {
  chart: string;
}

const MermaidBlock = ({ chart }: MermaidBlockProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useThemeContext();
  const [svg, setSvg] = useState<string>("");
  const isDark = theme === "kristiania-dark";

  useEffect(() => {
    const render = async () => {
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? "dark" : "neutral",
        // Fiks størrelse
        flowchart: { useMaxWidth: true },
        pie: { useMaxWidth: true },
      });

      try {
        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        const { svg } = await mermaid.render(id, chart);
        setSvg(svg);
      } catch (err) {
        console.error("Mermaid render error:", err);
      }
    };

    render();
  }, [chart, isDark]);

  if (!svg) return null;

  return (
    <div
      className="my-4 flex justify-center overflow-hidden"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default MermaidBlock;
