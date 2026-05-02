import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import useSearchChats from "../../hooks/useSearchChats";
import ChatListItem from "../../components/chat/ChatListItem";
import PageHeader from "../../components/shared/PageHeader";
import PageContainer from "../../components/shared/PageContainer";

/**
 * SearchResultPage
 *
 * Displays search results based on the ?search= query parameter.
 * Syncs the search query with the URL so results are shareable and bookmarkable.
 * Allows refining the search directly on the page without navigating away.
 *
 * @route /search?search=query
 */
const SearchResultPage = () => {
  const { t } = useTranslation(["chat", "common"]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("search") ?? "";
  const { query, setQuery, results } = useSearchChats();

  // Sync URL query parameter to search hook on mount and when URL changes
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // Update both local state and URL when the user types
  const handleQueryChange = (value: string) => {
    setQuery(value);
    setSearchParams(value.trim() ? { search: value } : {});
  };

  return (
    <PageContainer>
      {/* Header: back button and search input */}
      <PageHeader
        title={
          <label className="input input-bordered flex items-center gap-2 flex-1">
            <MagnifyingGlassIcon
              className="w-4 h-4 shrink-0 opacity-50"
              aria-hidden="true"
            />
            <input
              type="search"
              className="grow"
              placeholder={t("common:search")}
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              autoFocus
            />
          </label>
        }
        showBack
      />

      {/* Result count */}
      {query.trim() && (
        <p className="text-sm text-base-content/50 px-4 mb-2">
          {t("chat:searchResults", { count: results.length, query })}
        </p>
      )}

      <div className="divider my-1" />

      {/* Results list or empty state */}
      {results.length === 0 ? (
        <p className="text-base-content/50 text-sm px-4">
          {t("common:noResults")}
        </p>
      ) : (
        <ul className="list bg-base-100 rounded-box">
          {results.map((chat) => (
            <ChatListItem key={chat.id} chat={chat} />
          ))}
        </ul>
      )}
    </PageContainer>
  );
};

export default SearchResultPage;
