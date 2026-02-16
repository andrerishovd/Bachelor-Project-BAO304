import type { KeyboardEvent } from "react";

// hook for handling simple keyboard inputs

type KeyHandlers = {
  onEnter?: () => void;
  onEscape?: () => void;
  onSpace?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
};

export const useKeyboard = (handlers: KeyHandlers) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
        if (handlers.onEnter) {
          e.preventDefault();
          handlers.onEnter();
        }
        break;
      case "Escape":
        if (handlers.onEscape) {
          e.preventDefault();
          handlers.onEscape();
        }
        break;
      case " ":
        if (handlers.onSpace) {
          e.preventDefault();
          handlers.onSpace();
        }
        break;
      case "ArrowUp":
        if (handlers.onArrowUp) {
          e.preventDefault();
          handlers.onArrowUp();
        }
        break;
      case "ArrowDown":
        if (handlers.onArrowDown) {
          e.preventDefault();
          handlers.onArrowDown();
        }
        break;
    }
  };

  return { handleKeyDown };
};
