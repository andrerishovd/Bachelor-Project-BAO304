import { useState, useEffect } from "react";

// Hook for å toggle sidebar extended/collapsed state
// Lagrer brukerens preferanse i localStorage
// Oppdaterer checkbox fra daisyUI

export const useSidebarExtended = () => {
  const [isExtended, setIsExtended] = useState<boolean>(true);

  // Når siden lastes, hent lagret state fra localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-extended");
    const extended = savedState === null ? true : savedState === "true";
    setIsExtended(extended);
    updateDrawerState(extended);
  }, []);

  const updateDrawerState = (extended: boolean) => {
    document.documentElement.setAttribute(
      "data-sidebar-extended",
      String(extended),
    );

    // ✅ Synkroniser checkbox
    const checkbox = document.getElementById("my-drawer-4") as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = extended;
    }
  };

  // Toggle sidebar state
  const toggleSidebar = () => {
    const newState = !isExtended;
    setIsExtended(newState);
    localStorage.setItem("sidebar-extended", String(newState));
    updateDrawerState(newState);
  };

  const expandSidebar = () => {
    if (!isExtended) {
      setIsExtended(true);
      localStorage.setItem("sidebar-extended", "true");
      updateDrawerState(true);
    }
  };

  return { isExtended, toggleSidebar, expandSidebar };
};
