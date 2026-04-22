import { useState, useEffect, useMemo } from "react";
import { useChatContext } from "../contexts/ChatContext";

/**
 * useSearchChats
 *
 * Filters chats by title using a debounced search query.
 * Searches locally on already-loaded chat data from ChatContext.
 *
 * @param debounceMs - Delay in milliseconds before filtering (default: 300)
 * @returns query - Current search input value
 * @returns setQuery - Updates the search input value
 * @returns results - Filtered list of chats matching the query
 */
const useSearchChats = (debounceMs = 300) => {
  const { chats } = useChatContext();
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query), debounceMs);
    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  const results = useMemo(() => {
    if (!debounced.trim()) return chats;
    return chats.filter((chat) =>
      chat.title.toLowerCase().includes(debounced.toLowerCase()),
    );
  }, [chats, debounced]);

  return { query, setQuery, results };
};

export default useSearchChats;
