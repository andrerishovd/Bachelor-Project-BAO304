import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  TrashIcon,
  ChatBubbleLeftIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { formatLastMessageTime } from "../../utils/formatTime";
import type { IChat } from "../../interfaces/chat/IChat";

interface ChatListItemProps {
  chat: IChat;
  selected?: boolean;
  onSelect?: (id: string) => void;
  showCheckbox?: boolean;
}

/**
 * ChatListItem
 *
 * Reusable chat list item using DaisyUI list-row.
 * Used in ChatsPage and SearchResultPage.
 *
 * @property chat - The chat to display
 * @property selected - Whether the chat is selected
 * @property onSelect - Callback when checkbox is toggled
 * @property showCheckbox - Whether to show the selection checkbox
 */
const ChatListItem = ({
  chat,
  selected = false,
  onSelect,
  showCheckbox = false,
}: ChatListItemProps) => {
  const navigate = useNavigate();
  const lastMessage = chat.messageDtoList[chat.messageDtoList.length - 1];

  return (
    <li
      className={`list-row cursor-pointer hover:bg-base-200 transition-colors rounded-lg ${
        selected ? "bg-base-200" : ""
      }`}
      onClick={() => navigate(`/chat/${chat.id}`)}
    >
      {/* Checkbox eller ikon */}
      <div onClick={(e) => e.stopPropagation()}>
        {showCheckbox ? (
          <input
            type="checkbox"
            className="checkbox checkbox-sm rounded-md"
            checked={selected}
            onChange={() => onSelect?.(chat.id)}
          />
        ) : (
          <div className="size-10 rounded-box bg-base-200 flex items-center justify-center">
            <ChatBubbleLeftRightIcon className="w-5 h-5 text-base-content/40" />
          </div>
        )}
      </div>

      {/* Tittel og tidsstempel */}
      <div className="min-w-0">
        <p className="font-medium truncate">{chat.title}</p>
        <p className="text-xs text-base-content/50">
          {formatLastMessageTime(chat.messageDtoList)}
        </p>
      </div>

      {/* Siste melding */}
      {lastMessage && (
        <p className="list-col-wrap text-xs text-base-content/50 truncate">
          {lastMessage.body}
        </p>
      )}
    </li>
  );
};

export default ChatListItem;
