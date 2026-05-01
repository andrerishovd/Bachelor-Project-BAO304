import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../../contexts/ChatContext";
import { TrashIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import type { IChat } from "../../interfaces/chat/IChat";
import CreateChatButton from "../../components/shared/buttons/CreateChatButtonStandalone";
import useDeleteChat from "../../hooks/useDeleteChat";
import { formatLastMessageTime } from "../../utils/formatTime";
import ChatListItem from "../../components/chat/ChatListItem";

/**
 * ChatsPage
 *
 * Displays list of chat conversations.
 *
 */

const ChatsPage = () => {
  const { t } = useTranslation("chat");
  const { chats, loading, error } = useChatContext();
  const navigate = useNavigate();
  const { deleteChats, isDeleting } = useDeleteChat();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === chats.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(chats.map((c) => c.id)));
    }
  };

  const handleDelete = async () => {
    await deleteChats([...selected]);
    setSelected(new Set());
  };

  return (
    <div className="flex flex-col h-full overflow-hidden items-center">
      <div className="flex flex-col h-full overflow-hidden w-full max-w-2xl">
        {/* Header */}
        {/* TODO Fix header to be the same as the one in ChatDetailPage */}
        <div className="border-b border-base-300 p-4 flex items-center gap-2 shrink-0">
          <button onClick={() => navigate(-1)} className="btn btn-sm btn-ghost">
            <ArrowLeftIcon className="w-4 h-4" />
          </button>
          <h1 className="text-xl font-bold flex-1">{t("chatListHeader")}</h1>

          <CreateChatButton />
        </div>

        {/* Select all */}

        <div className="border-b border-base-300 p-4 flex items-center gap-2 shrink-0">
          {chats.length > 0 && (
            <label className="flex items-center gap-3 px-4 py-2 text-sm text-base-content/60 cursor-pointer shrink-0">
              <input
                type="checkbox"
                className="checkbox checkbox-sm rounded-md"
                checked={selected.size === chats.length}
                onChange={toggleSelectAll}
              />
              {t("selectAll")}
            </label>
          )}

          {selected.size > 0 && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="btn btn-secondary"
            >
              <TrashIcon className="w-4 h-4" />
              {t("deleteSelected", { count: selected.size })}
            </button>
          )}
        </div>

        {/* Scrollable list */}
        <ul className="list bg-base-100 rounded-box p-4">
          {chats.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              selected={selected.has(chat.id)}
              onSelect={toggleSelect}
              showCheckbox
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatsPage;
