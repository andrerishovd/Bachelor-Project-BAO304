import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

/**
 * CreateChatButtonStandalone
 *
 * A standalone version of CreateChatButton for use outside the sidebar.
 * Uses standard DaisyUI button classes and does not depend on sidebar state.
 *
 * @example
 * <CreateChatButtonStandalone />
 */
const CreateChatButtonStandalone = () => {
  const { t } = useTranslation("chat");
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/chat/new")}
      className="btn btn-netural btn-sm gap-2"
    >
      <PlusIcon className="size-4 shrink-0" aria-hidden="true" />
      {t("newChat")}
    </button>
  );
};

export default CreateChatButtonStandalone;
