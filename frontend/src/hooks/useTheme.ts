/* import { useState, useEffect } from "react";

// hook for å endre fargen/tema som er lagret i nettleserens localStorage.
// Dette tar vare på brukerens farge-preferanse

export const useTheme = () => {
  const [theme, setTheme] = useState<string>("light");

  // Når siden lastes hentes det forrige valget fra localStorage og temaet settes.
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Når brukeren toggler, bytter den tema, lagrer valget, og oppdaterer HTML-attributtet.
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const setCustomTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return { theme, toggleTheme, setCustomTheme };
};
 */
