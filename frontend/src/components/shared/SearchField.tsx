import { useTranslation } from "react-i18next";
import { forwardRef, useRef } from "react";
import { useSidebar } from "../../contexts/SidebarContext";

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

  if (!isExtended) {
    return (
      <button onClick={handleSearchClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2"
          fill="none"
          stroke="currentColor"
          className="my-1.5 inline-block size-4"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
      </button>
    );
  }

  return (
    <label className="input input-bordered flex items-center gap-2 w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2"
        fill="none"
        stroke="currentColor"
        className="h-4 w-4 opacity-70 shrink-0"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
      <input
        ref={inputRef}
        type="search"
        className="grow"
        placeholder={t("search")}
      />
    </label>
  );
});

SearchField.displayName = "SearchField";

export default SearchField;
