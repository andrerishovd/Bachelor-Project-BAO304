import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: ReactNode;
  description?: string;
  showBack?: boolean;
  actions?: ReactNode;
}

/**
 * PageHeader
 *
 * Consistent header component used across all pages.
 * Optionally shows a back button, title, description and action buttons.
 *
 * @property title - Page title, can be a string or a React node
 * @property description - Optional subtitle shown below the title
 * @property showBack - Whether to show a back navigation button (default: false)
 * @property actions - Optional action buttons shown on the right side
 *
 * @example
 * <PageHeader
 *   title={t("chatListHeader")}
 *   showBack
 *   actions={<CreateChatButtonStandalone />}
 * />
 */
const PageHeader = ({
  title,
  description,
  showBack = false,
  actions,
}: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="border-b border-base-300 p-4 flex items-center gap-2 shrink-0">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="btn btn-sm btn-ghost shrink-0"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </button>
      )}
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold truncate">{title}</h1>
        {description && (
          <p className="text-sm text-base-content/60 mt-1">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2 shrink-0">{actions}</div>
      )}
    </div>
  );
};

export default PageHeader;
