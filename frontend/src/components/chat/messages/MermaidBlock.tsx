import { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { useThemeContext } from "../../../contexts/ThemeContext";

interface MermaidBlockProps {
  chart: string;
}

/**
 * MermaidBlock
 *
 * Renders a Mermaid diagram from a code block.
 *
 * @property chart - The Mermaid diagram definition
 */

const MermaidBlock = ({ chart }: MermaidBlockProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useThemeContext();

  const isDark = theme === "kristiania-dark";

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? "dark" : "neutral",
    });

    if (ref.current) {
      const id = `mermaid-${Date.now()}`;
      mermaid.render(id, chart).then(({ svg }) => {
        if (ref.current) ref.current.innerHTML = svg;
      });
    }
  }, [chart, isDark]);

  return <div ref={ref} className="my-4 flex justify-center" />;
};

export default MermaidBlock;
