import { useTranslation } from "react-i18next";
import { forwardRef, useRef, useState } from "react";
import { useSidebar } from "../../contexts/SidebarContext";
import { useKeyboard } from "../../hooks/useKeyboard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import useSearchChats from "../../hooks/useSearchChats";
import { motion, AnimatePresence } from "motion/react";

const SearchField = forwardRef<HTMLInputElement>((props, ref) => {
  const { t } = useTranslation("common");
  const { isExtended, expandSidebar } = useSidebar();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { query, setQuery, results } = useSearchChats();
  const [isFocused, setIsFocused] = useState(false);

  const showSuggestions = isFocused && query.trim().length > 0;

  const handleSearchClick = () => {
    expandSidebar();
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSubmit = () => {
    if (query.trim()) {
      navigate(`/search?search=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setIsFocused(false);
    }
  };

  const { handleKeyDown } = useKeyboard({
    onEnter: isExtended ? handleSubmit : handleSearchClick,
    onSpace: handleSearchClick,
    onEscape: () => setIsFocused(false),
  });

  if (!isExtended) {
    return (
      <li>
        <button
          onClick={handleSearchClick}
          onKeyDown={handleKeyDown}
          aria-label={t("accessibility:expandSidebarAndSearch")}
        >
          <MagnifyingGlassIcon className="size-4 shrink-0" aria-hidden="true" />
        </button>
      </li>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input + søkeknapp på samme rad */}
      <div className="flex items-center gap-2">
        <label
          className="input input-bordered flex items-center gap-2 flex-1"
          aria-label={t("accessibility:searchLabel")}
        >
          <AnimatePresence>
            {!isFocused && (
              <motion.span
                key="search-icon"
                initial={{ opacity: 0, width: "auto" }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
              >
                <MagnifyingGlassIcon
                  className="size-4 shrink-0"
                  aria-hidden="true"
                />
              </motion.span>
            )}
          </AnimatePresence>

          <input
            ref={inputRef}
            type="search"
            className="grow"
            placeholder={t("search")}
            aria-label={t("accessibility:searchLabel")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            onKeyDown={handleKeyDown}
          />
        </label>

        {/* Søkeknapp til høyre som glir inn */}

        <motion.button
          onClick={handleSubmit}
          className="btn btn-primary btn-sm shrink-0 overflow-hidden"
          animate={{
            width: isFocused ? "auto" : 0,
            opacity: isFocused ? 1 : 0,
            padding: isFocused ? undefined : 0,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <MagnifyingGlassIcon className="w-4 h-4 shrink-0" />
        </motion.button>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && (
        <ul className="absolute top-full left-0 right-0 mt-1 menu bg-base-100 rounded-box shadow-lg z-50 max-h-64 overflow-y-auto">
          {results.length === 0 ? (
            <li className="px-4 py-2 text-sm text-base-content/50">
              {t("noResults")}
            </li>
          ) : (
            results.map((chat) => (
              <li key={chat.id}>
                <button
                  onClick={() => {
                    navigate(`/chat/${chat.id}`);
                    setQuery("");
                    setIsFocused(false);
                  }}
                  className="text-sm truncate"
                >
                  <MagnifyingGlassIcon className="w-3 h-3 shrink-0 opacity-50" />
                  <span className="truncate">{chat.title}</span>
                </button>
              </li>
            ))
          )}
          <li className="border-t border-base-200">
            <button onClick={handleSubmit} className="text-sm text-primary">
              {t("seeAllResults", { query })}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
});

SearchField.displayName = "SearchField";

export default SearchField;
