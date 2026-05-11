import { useTranslation } from "react-i18next";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import useDeleteChat from "../../../hooks/useDeleteChat";
import { useEffect, useRef, useState } from "react";
import EditChatTitleModal from "../modals/EditChatTitleModal";

interface ChatOptionsDropdownProps {
  chatId: string;
  currentTitle: string;
  isOpen: boolean;
  onToggle: () => void;
}
/**
 * ChatOptionsDropdown
 *
 * Popover dropdown with actions for a single chat.
 * Currently supports delete and edit title.
 *
 * @property chatId - The ID of the chat
 * @property onEditTitle - Callback for when the user wants to edit the title
 *
 * @example
 * <ChatOptionsDropdown chatId={chat.id} onEditTitle={() => setEditing(true)} />
 */

/* TODO: Fix propogation to ChatList elements
button click in the dropdown also propogates to chatlist 
and therefore makes it appear like two buttons are pressed at the same time.
*/
const ChatOptionsDropdown = ({
  chatId,
  currentTitle,
  isOpen,
  onToggle,
}: ChatOptionsDropdownProps) => {
  const { t } = useTranslation("chat");
  const { deleteChat } = useDeleteChat();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div>
      <div className={`dropdown dropdown-end ${isOpen ? "dropdown-open" : ""}`}>
        <button
          className="btn btn-xs btn-ghost"
          onClick={onToggle}
          aria-label={t("chatOptions")}
          aria-haspopup="menu"
          aria-expanded={isOpen}
        >
          <EllipsisHorizontalIcon className="w-4 h-4" aria-hidden="true" />
        </button>

        {isOpen && (
          <ul
            className="dropdown-content menu w-48 rounded-box bg-base-100 shadow-sm z-50"
            role="menu"
            aria-label={t("chatOptions")}
          >
            <li role="none">
              <a
                role="menuitem"
                onClick={() => {
                  onToggle();
                  setIsEditModalOpen(true);
                }}
              >
                <PencilIcon className="w-4 h-4" aria-hidden="true" />
                {t("editTitle")}
              </a>
            </li>
            <li role="none">
              <a
                role="menuitem"
                onClick={() => {
                  onToggle();
                  deleteChat(chatId);
                }}
                className="text-error"
              >
                <TrashIcon className="w-4 h-4" aria-hidden="true" />
                {t("deleteChat")}
              </a>
            </li>
          </ul>
        )}
      </div>

      <EditChatTitleModal
        chatId={chatId}
        currentTitle={currentTitle}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};

export default ChatOptionsDropdown;
