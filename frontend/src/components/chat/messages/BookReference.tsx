import { useTranslation } from "react-i18next";
import {
  ArrowTopRightOnSquareIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import useBookInfo from "../../../hooks/useBookInfo";
import { buildLibraryUrl } from "../../../utils/isbn";

interface BookReferenceProps {
  isbn: string;
}

/**
 * BookReference
 *
 * Displays a book reference card with cover image, title, author
 * and a link to the Kristiania library.
 *
 * @property isbn - The ISBN to look up
 */
const BookReference = ({ isbn }: BookReferenceProps) => {
  const { t } = useTranslation("chat");
  const { info, isLoading } = useBookInfo(isbn);
  const libraryUrl = buildLibraryUrl(isbn);

  return (
    <a
      href={libraryUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 rounded-lg bg-base-200 hover:bg-base-300 transition-colors group"
    >
      {/* Cover image or fallback icon */}
      {isLoading ? (
        <div className="w-10 h-14 skeleton shrink-0" />
      ) : info.coverUrl ? (
        <img
          src={info.coverUrl}
          alt={info.title ?? `Bokomslag for ISBN ${isbn}`}
          className="w-10 h-14 object-cover rounded shrink-0"
        />
      ) : (
        <div className="w-10 h-14 bg-base-300 rounded flex items-center justify-center shrink-0">
          <BookOpenIcon className="w-5 h-5 text-base-content/40" />
        </div>
      )}

      {/* Book info */}
      <div className="flex-1 min-w-0">
        {isLoading ? (
          <>
            <div className="skeleton h-3 w-36 mb-1" />
            <div className="skeleton h-3 w-24" />
          </>
        ) : (
          <>
            <p className="text-sm font-medium truncate">
              {info.title ?? `ISBN ${isbn}`}
            </p>
            {info.author && (
              <p className="text-xs text-base-content/50 truncate">
                {info.author}
              </p>
            )}
            <p className="text-xs text-base-content/40">ISBN {isbn}</p>
          </>
        )}
      </div>

      {/* External link icon */}
      <ArrowTopRightOnSquareIcon className="w-4 h-4 shrink-0 text-base-content/30 group-hover:text-primary transition-colors" />
    </a>
  );
};

export default BookReference;
