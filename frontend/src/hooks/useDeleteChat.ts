import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { ChatService } from "../services/ChatService";
import { useAlertContext } from "../contexts/AlertContext";
import { useChatContext } from "../contexts/ChatContext";

/**
 * useDeleteChat
 *
 * Hook for deleting one or multiple chats.
 * Navigates away if the active chat is deleted.
 *
 * @returns deleteChat - Deletes a single chat by ID
 * @returns deleteChats - Deletes multiple chats by ID
 * @returns isDeleting - Whether a delete operation is in progress
 *
 * @example
 * const { deleteChat, deleteChats, isDeleting } = useDeleteChat();
 * await deleteChat("123");
 * await deleteChats(["123", "456"]);
 */
const useDeleteChat = () => {
  const { t } = useTranslation("chat");
  const { showError, showSuccess } = useAlertContext();
  const { refetch } = useChatContext();
  const { chatId: activeChatId } = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteChats = async (ids: string[]) => {
    setIsDeleting(true);
    try {
      await Promise.all(ids.map((id) => ChatService.deleteChat(id)));
      await refetch();
      showSuccess(t("deleteSuccess", { count: ids.length }));

      // Navigate away if the active chat was deleted
      if (activeChatId && ids.includes(activeChatId)) {
        navigate("/chats");
      }
    } catch {
      showError(t("deleteError"));
    } finally {
      setIsDeleting(false);
    }
  };

  const deleteChat = async (id: string) => {
    await deleteChats([id]);
  };

  return { deleteChat, deleteChats, isDeleting };
};

export default useDeleteChat;
