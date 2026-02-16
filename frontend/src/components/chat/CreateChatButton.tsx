import { useState } from "react";
import { ChatService } from "../../services/ChatService";
import type { IChat } from "../../interfaces/chat/IChat";
import { AxiosError } from "axios";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useSidebar } from "../../contexts/SidebarContext";
import { useTranslation } from "react-i18next";

const CreateChatButton = () => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string>("");
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isExtended, expandSidebar } = useSidebar();
  const { t } = useTranslation("chat");
  const handleCreateChat = async () => {
    setLoading(true);
    setError(null);
    try {
      const newChat = await ChatService.createChat(
        "Why are we still here just to suffer?",
      );
      console.log("✅ Chat created:", newChat);
      alert(`Chat created with ID: ${newChat.id}`);
      await handleGetAllChats();
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(`API Error: ${err.response?.status} - ${err.message}`);
      } else {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGetAllChats = async () => {
    setLoading(true);
    setError(null);
    try {
      const allChats = await ChatService.getAllChats();
      setChats(allChats);
      console.log("✅ Fetched chats:", allChats);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(`API Error: ${err.response?.status} - ${err.message}`);
      } else {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isExtended) {
    return (
      <button
        className="btn btn-square btn-primary"
        onClick={handleCreateChat}
        aria-label={t("newChat")}
      >
        <PlusIcon className="size-4 shrink-0" aria-hidden="true" />
      </button>
    );
  } else {
    return (
      <>
        <label
          className="flex items-center gap-2 w-full bg-primary"
          onClick={handleCreateChat}
        >
          <PlusIcon
            className="my-1.5 inline-block size-4 shrink-0"
            aria-hidden="true"
          />
          <span className="is-drawer-close:hidden">{t("newChat")}</span>
        </label>
      </>
    );
  }
};
export default CreateChatButton;
