import { useState, useEffect } from "react";

/**
 * useSidebarExtended
 *
 * Manages the sidebar's expanded/collapsed state.
 * Persists the user's preference in localStorage so it
 * is restored on page reload.
 *
 * Syncs state with the DaisyUI drawer checkbox and the
 * `data-sidebar-extended` attribute on the document root,
 * which is used for CSS-based sidebar styling.
 *
 * @returns
 * - isExtended: Whether the sidebar is currently expanded
 * - toggleSidebar: Toggles between expanded and collapsed
 * - expandSidebar: Expands the sidebar if it is collapsed
 *
 * @example
 * const { isExtended, toggleSidebar } = useSidebarExtended();
 */
export const useSidebarExtended = () => {
  const [isExtended, setIsExtended] = useState<boolean>(true);

  // Restore sidebar state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-extended");
    const extended = savedState === null ? true : savedState === "true";
    setIsExtended(extended);
    updateDrawerState(extended);
  }, []);

  /**
   * Syncs sidebar state with the DaisyUI drawer checkbox
   * and the data-sidebar-extended attribute on the document root.
   *
   * @param extended - Whether the sidebar should be expanded
   */
  const updateDrawerState = (extended: boolean) => {
    document.documentElement.setAttribute(
      "data-sidebar-extended",
      String(extended),
    );

    const checkbox = document.getElementById("my-drawer-4") as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = extended;
    }
  };

  /**
   * Toggles the sidebar between expanded and collapsed,
   * and persists the new state to localStorage.
   */
  const toggleSidebar = () => {
    const newState = !isExtended;
    setIsExtended(newState);
    localStorage.setItem("sidebar-extended", String(newState));
    updateDrawerState(newState);
  };

  /**
   * Expands the sidebar if it is currently collapsed.
   * Used when triggering actions that require the sidebar to be visible,
   * such as focusing the search field.
   */
  const expandSidebar = () => {
    if (!isExtended) {
      setIsExtended(true);
      localStorage.setItem("sidebar-extended", "true");
      updateDrawerState(true);
    }
  };

  return { isExtended, toggleSidebar, expandSidebar };
};
