import { useState, useEffect } from "react";

/**
 * useDelayedBoolean
 *
 * Returns true only after the value has been true for longer than the delay.
 * Useful for showing skeletons only when loading takes more than X ms.
 *
 * @param value - The boolean to delay
 * @param delayMs - Delay in milliseconds (default: 500)
 */
const useDelayedBoolean = (value: boolean, delayMs = 500): boolean => {
  const [delayed, setDelayed] = useState(false);

  useEffect(() => {
    if (!value) {
      setDelayed(false);
      return;
    }
    const timer = setTimeout(() => setDelayed(true), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return delayed;
};

export default useDelayedBoolean;
