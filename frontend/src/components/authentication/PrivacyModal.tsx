import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * PrivacyModal
 *
 * Displays a simple privacy and data usage statement.
 * Opened via a link on the authentication page.
 */
const PrivacyModal = ({ isOpen, onClose }: PrivacyModalProps) => {
  const { t } = useTranslation("auth");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <>
      <dialog ref={dialogRef} className="modal" onClose={onClose}>
        <div className="modal-box max-w-lg">
          <h3 className="font-bold text-lg mb-2">{t("privacy.title")}</h3>
          <p className="text-sm text-base-content/70 mb-4">
            {t("privacy.intro")}
          </p>

          <div className="flex flex-col gap-4">
            <section>
              <h4 className="font-semibold text-sm mb-1">
                {t("privacy.sections.whatWeCollect")}
              </h4>
              <p className="text-sm text-base-content/70">
                {t("privacy.sections.whatWeCollectText")}
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-sm mb-1">
                {t("privacy.sections.howWeUse")}
              </h4>
              <p className="text-sm text-base-content/70">
                {t("privacy.sections.howWeUseText")}
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-sm mb-1">
                {t("privacy.sections.microsoft")}
              </h4>
              <p className="text-sm text-base-content/70">
                {t("privacy.sections.microsoftText")}{" "}
                <a
                  href="https://www.microsoft.com/nb-NO/privacy/privacystatement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-primary"
                >
                  {t("privacy.microsoftPrivacy")}
                </a>
              </p>
            </section>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={onClose}>
                {t("close")}
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={onClose}>{t("close")}</button>
        </form>
      </dialog>
    </>
  );
};

export default PrivacyModal;
