import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useKeyboard } from "../../hooks/useKeyboard";
import UserAvatar from "../shared/UserAvatar";
import { useAuth } from "../../hooks/useAuth";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ProfileModal
 *
 * Displays basic profile information and a logout button.
 *
 * @deprecated This component is not used in the final solution.
 * There is currently not enough "personalisation" or Profile options to warrant a component for this.
 * The few options that are available, has been consolidated into SettingsModal.
 *
 * @property isOpen - Whether the modal is open
 * @property onClose - Callback to close the modal
 */
const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { t } = useTranslation(["common", "settings"]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { logout } = useAuth();

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const { handleKeyDown } = useKeyboard({
    onEscape: onClose,
  });

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      id="profile_modal"
      className="modal"
      onKeyDown={handleKeyDown}
    >
      <div className="modal-box">
        <div className="flex items-center gap-3">
          <UserAvatar />
          <h3 className="font-bold text-lg">{t("common:profile")}</h3>
        </div>
        <p className="py-4 text-sm text-base-content/60">
          {t("common:profileDescription")}
        </p>
        <div className="flex justify-between items-center">
          <button
            className="btn btn-soft btn-error"
            onClick={logout}
          >
            {t("settings:logout")}
          </button>
          <form method="dialog">
            <button className="btn" onClick={onClose}>
              {t("common:close")}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ProfileModal;