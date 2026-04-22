import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useKeyboard } from "../../hooks/useKeyboard";
import UserAvatar from "../shared/UserAvatar";
import { useAuth } from "../../hooks/useAuth";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { t } = useTranslation(["common"]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { logout, isLoading } = useAuth();
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
    <>
      <dialog
        ref={dialogRef}
        onClose={onClose}
        id="profile_modal"
        className="modal"
        onKeyDown={handleKeyDown}
      >
        <div className="modal-box">
          <div className="flex">
            <UserAvatar />
            <h3 className="font-bold text-lg">{t("profile")}</h3>
          </div>
          <p className="py-4">Her står det info om din profil</p>
          <button
            className="btn btn-soft btn-error"
            data-tip={t("profile")}
            onClick={logout}
          >
            Log out
          </button>
          <form method="dialog">
            <button className="btn">{t("close")}</button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ProfileModal;
