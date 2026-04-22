import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../contexts/ChatContext";
import { TrashIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import type { IChat } from "../interfaces/chat/IChat";
import CreateChatButton from "../components/chat/CreateChatButton";
import useDeleteChat from "../hooks/useDeleteChat";
import { formatLastMessageTime } from "../utils/formatTime";

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
          {selected.size > 0 && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="btn btn-error gap-2"
            >
              <TrashIcon className="w-4 h-4" />
              {t("deleteSelected", { count: selected.size })}
            </button>
          )}
          <div className="shrink-0">
            <CreateChatButton />
          </div>
        </div>

        {/* Select all */}
        {chats.length > 0 && (
          <label className="flex items-center gap-3 px-4 py-2 text-sm text-base-content/60 cursor-pointer shrink-0">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={selected.size === chats.length}
              onChange={toggleSelectAll}
            />
            {t("selectAll")}
          </label>
        )}

        {/* Scrollable list */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {loading ? (
            <div className="flex flex-col gap-3 p-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3">
                  <div className="skeleton w-4 h-4 rounded" />
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="skeleton h-3 w-48" />
                    <div className="skeleton h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <p className="text-error text-sm p-4">{error}</p>
          ) : chats.length === 0 ? (
            <p className="text-base-content/50 text-sm p-4">{t("noChats")}</p>
          ) : (
            <ul className="flex flex-col gap-1 p-4">
              {chats.map((chat) => (
                <li
                  key={chat.id}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-base-200 transition-colors ${
                    selected.has(chat.id) ? "bg-base-200" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm shrink-0"
                    checked={selected.has(chat.id)}
                    onChange={() => toggleSelect(chat.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div
                    className="flex-1 min-w-0"
                    onClick={() => navigate(`/chat/${chat.id}`)}
                  >
                    <p className="font-medium truncate">{chat.title}</p>
                    <p className="text-xs text-base-content/50">
                      {formatLastMessageTime(chat.messageDtoList)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatsPage;
