import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import useSearchChats from "../hooks/useSearchChats";
import type { IChat } from "../interfaces/chat/IChat";
import { formatLastMessageTime } from "../utils/formatTime";

/**
 * SearchResultPage
 *
 * Displays search results based on the ?search= query parameter.
 * Requires an active search query to navigate here.
 * Allows refining the search directly on the page.
 *
 * @route /search?search=query
 */
const SearchResultPage = () => {
  const { t } = useTranslation(["chat", "common"]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("search") ?? "";
  const { query, setQuery, results } = useSearchChats();

  // Sync query fra URL til hooken
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // Oppdater URL når man skriver uten debounce-delay
  const handleQueryChange = (value: string) => {
    setQuery(value);
    setSearchParams(value.trim() ? { search: value } : {});
  };

  return (
    <div className="flex flex-col h-full p-6 max-w-2xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="btn btn-sm btn-ghost">
          <ArrowLeftIcon className="w-4 h-4" />
        </button>
        <label className="input input-bordered flex items-center gap-2 flex-1">
          <MagnifyingGlassIcon className="w-4 h-4 shrink-0 opacity-50" />
          <input
            type="search"
            className="grow"
            placeholder={t("common:search")}
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            autoFocus
          />
        </label>
      </div>

      {/* Result count */}
      {query.trim() && (
        <p className="text-sm text-base-content/50 px-4 mb-2">
          {t("chat:searchResults", { count: results.length, query })}
        </p>
      )}

      <div className="divider my-1" />

      {/* Results */}
      {results.length === 0 ? (
        <p className="text-base-content/50 text-sm px-4">
          {t("common:noResults")}
        </p>
      ) : (
        <ul className="flex flex-col gap-1">
          {results.map((chat) => (
            <li
              key={chat.id}
              className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-base-200 transition-colors"
              onClick={() => navigate(`/chat/${chat.id}`)}
            >
              <MagnifyingGlassIcon className="w-4 h-4 shrink-0 opacity-30" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{chat.title}</p>
                <p className="text-xs text-base-content/50">
                  {formatLastMessageTime(chat.messageDtoList)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResultPage;
