import { useState, useEffect, useRef } from "react";

/**
 * useOpenDropdown
 *
 * Tracks which dropdown is currently open by ID.
 * Ensures only one dropdown is open at a time.
 * Closes dropdown when clicking outside.
 *
 * @returns isOpen - Returns true if the given ID is currently open
 * @returns toggle - Toggles the dropdown with the given ID
 * @returns close - Closes the dropdown
 * @returns containerRef - Attach to the container element to detect outside clicks
 */
const useOpenDropdown = (onOpenChange?: (isOpen: boolean) => void) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpenId(null);
        onOpenChange?.(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onOpenChange]);

  const toggle = (id: string) => {
    const next = openId !== id ? id : null;
    setOpenId(next);
    onOpenChange?.(next !== null);
  };

  const close = () => {
    setOpenId(null);
    onOpenChange?.(false);
  };

  const isOpen = (id: string) => openId === id;

  return { isOpen, toggle, close, containerRef };
};

export default useOpenDropdown;
