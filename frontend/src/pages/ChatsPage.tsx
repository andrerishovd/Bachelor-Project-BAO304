
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../contexts/ChatContext";
import { TrashIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import type { IChat } from "../interfaces/chat/IChat";
import CreateChatButton from "../components/chat/CreateChatButton";
import useDeleteChat from "../hooks/useDeleteChat";

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

  const getLastMessageTime = (chat: IChat): string => {
    const messages = chat.messageDtoList;
    if (!messages || messages.length === 0) return "";
    const last = messages[messages.length - 1];
    return new Date(last.localDateTime).toLocaleString("nb-NO", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-full p-6 max-w-2xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="btn btn-sm btn-ghost">
          <ArrowLeftIcon className="w-4 h-4" />
        </button>
        <h1 className="text-xl font-bold flex-1">{t("chatListHeader")}</h1>
        {selected.size > 0 && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="btn btn-sm btn-error gap-2"
          >
            <TrashIcon className="w-4 h-4" />
            {t("deleteSelected", { count: selected.size })}
          </button>
        )}
        <CreateChatButton />
      </div>

      {/* Select all */}
      {chats.length > 0 && (
        <label className="flex items-center gap-3 px-4 py-2 text-sm text-base-content/60 cursor-pointer">
          <input
            type="checkbox"
            className="checkbox checkbox-sm"
            checked={selected.size === chats.length}
            onChange={toggleSelectAll}
          />
          {t("selectAll")}
        </label>
      )}

      <div className="divider my-1" />

      {/* Chat list */}
      {loading ? (
        <div className="flex flex-col gap-3">
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
        <p className="text-error text-sm">{error}</p>
      ) : chats.length === 0 ? (
        <p className="text-base-content/50 text-sm">{t("noChats")}</p>
      ) : (
        <ul className="flex flex-col gap-1">
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
                  {getLastMessageTime(chat)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatsPage;
