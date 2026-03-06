import { useState, useCallback } from "react";

/**
 * useLoading
 *
 * Custom hook for wrapping async operations with loading state.
 *
 * @returns loading - Whether an async operation is in progress
 * @returns withLoading - Wraps an async function with loading state
 *
 * @example
 * const { loading, withLoading } = useLoading();
 * await withLoading(() => fetchMessages(chatId));
 */
const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const withLoading = useCallback(async <T>(fn: () => Promise<T>): Promise<T> => {
    setLoading(true);
    try {
      return await fn();
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, withLoading };
};

export default useLoading;