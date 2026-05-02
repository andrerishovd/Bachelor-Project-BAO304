import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChatService } from "../../../services/ChatService";
import { useChatContext } from "../../../contexts/ChatContext";
import { useAlertContext } from "../../../contexts/AlertContext";
import { createPortal } from "react-dom";

interface EditChatTitleModalProps {
  chatId: string;
  currentTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * EditChatTitleModal
 *
 * Modal for editing the title of a chat.
 * Calls ChatService.updateChatTitle and refetches chat list on success.
 *
 * @property chatId - The ID of the chat to rename
 * @property currentTitle - The current title shown as default value
 * @property isOpen - Whether the modal is open
 * @property onClose - Callback to close the modal
 */
const EditChatTitleModal = ({
  chatId,
  currentTitle,
  isOpen,
  onClose,
}: EditChatTitleModalProps) => {
  const { t } = useTranslation("chat");
  const { refetch } = useChatContext();
  const { showError, showSuccess } = useAlertContext();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [title, setTitle] = useState(currentTitle);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTitle(currentTitle);
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen, currentTitle]);

  const handleSave = async () => {
    if (!title.trim() || title === currentTitle) {
      onClose();
      return;
    }
    setIsSaving(true);
    try {
      await ChatService.updateChatTitle(chatId, title.trim());
      await refetch();
      showSuccess(t("titleUpdated"));
      onClose();
    } catch {
      showError(t("titleUpdateError"));
    } finally {
      setIsSaving(false);
    }
  };

  return createPortal(
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">{t("editTitle")}</h3>
        <input
          type="text"
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") onClose();
          }}
          autoFocus
        />
        <div className="modal-action">
          <button onClick={onClose} className="btn btn-ghost">
            {t("cancel")}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || !title.trim()}
            className="btn btn-primary"
          >
            {t("save")}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>,
    document.body,
  );
};

export default EditChatTitleModal;
