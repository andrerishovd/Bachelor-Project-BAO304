import { useTranslation } from "react-i18next";
import { forwardRef, useRef } from "react";
import { useSidebar } from "../../contexts/SidebarContext";
import { useKeyboard } from "../../hooks/useKeyboard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchField = forwardRef<HTMLInputElement>((props, ref) => {
  const { t } = useTranslation("common");
  const { isExtended, expandSidebar } = useSidebar();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    expandSidebar();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const { handleKeyDown } = useKeyboard({
    onEnter: handleSearchClick,
    onSpace: handleSearchClick,
  });

  if (!isExtended) {
    return (
      <button
        onClick={handleSearchClick}
        onKeyDown={handleKeyDown}
        aria-label={t("accessibility:expandSidebarAndSearch")}
      >
        <MagnifyingGlassIcon className="my-1.5 inline-block size-4 shrink-0" />
      </button>
    );
  }

  return (
    <label
      className="input input-bordered flex items-center gap-2 w-full"
      aria-label={t("accessibility:searchLabel")}
    >
      <MagnifyingGlassIcon className="my-1.5 inline-block size-4 shrink-0" />
      <input
        ref={inputRef}
        type="search"
        className="grow"
        placeholder={t("search")}
        aria-label={t("accessibility:searchLabel")}
      />
    </label>
  );
});

SearchField.displayName = "SearchField";

export default SearchField;
