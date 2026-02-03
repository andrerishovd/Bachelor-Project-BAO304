import { useState, useEffect } from "react";

// Hook for å toggle sidebar extended/collapsed state
// Lagrer brukerens preferanse i localStorage

export const useSidebarExtended = () => {
  const [isExtended, setIsExtended] = useState<boolean>(true);

  // Når siden lastes, hent lagret state fra localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-extended");
    const extended = savedState === null ? true : savedState === "true";
    setIsExtended(extended);
    document.documentElement.setAttribute(
      "data-sidebar-extended",
      String(extended),
    );
  }, []);

  // Toggle sidebar state
  const toggleSidebar = () => {
    const newState = !isExtended;
    setIsExtended(newState);
    localStorage.setItem("sidebar-extended", String(newState));
    document.documentElement.setAttribute(
      "data-sidebar-extended",
      String(newState),
    );
  };

  return { isExtended, toggleSidebar };
};
