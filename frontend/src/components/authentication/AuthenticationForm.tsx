// src/components/auth/AuthenticationForm.tsx
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import ChangeLangBtn from "../shared/buttons/ChangeLangBtn";
import ThemeControllerToggle from "../shared/ThemeControllerToggle";
import canvasLogo from "../../assets/canvas-logo.svg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "motion/react";
import AppLogo from "../shared/AppLogoSm";
import AppLogoLg from "../shared/AppLogoLg";
import { useState } from "react";
import PrivacyModal from "./PrivacyModal";

// Feature flags, set to true or false depending on which login method should be available.
const allowEmailSignIn = false;
const allowEntraIdSignIn = true;
const allowCanvasSignIn = false;

/**
 * AuthenticationForm
 *
 * Renders login options based on feature flags.
 * Enable/disable login methods by toggling the constants above.
 */

const AuthenticationForm = () => {
  const { t } = useTranslation("auth");
  const { login, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Creates dynamic consent text based on the feature flags.
  const getConsentText = () => {
    const methods: string[] = [];
    if (allowEmailSignIn) methods.push(t("consent.email"));
    if (allowEntraIdSignIn) methods.push(t("consent.entraId"));
    if (allowCanvasSignIn) methods.push(t("consent.canvas"));

    if (methods.length === 0) return null;
    return (
      t("consent.prefix") + " " + methods.join(", ") + " " + t("consent.suffix")
    );
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="absolute top-4 right-4 flex gap-2">
        <ChangeLangBtn />
        <ThemeControllerToggle />
      </div>

      <div className="hero-content flex-col lg:flex-row-reverse">
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        >
          <AppLogoLg useKristianiaFont stacked />
          <p className="py-6">{t("description.info")}</p>
        </motion.div>

        <motion.div
          className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
        >
          <div className="card-body">
            <fieldset className="fieldset flex flex-col gap-2">
              {/* Email login */}
              {allowEmailSignIn && (
                <>
                  <label className="label">{t("email")}</label>
                  <input
                    type="email"
                    className="input"
                    placeholder={t("email")}
                  />
                  <label className="label">{t("password")}</label>
                  <input
                    type="password"
                    className="input"
                    placeholder={t("password")}
                  />
                  <a className="link link-hover text-sm">{t("forgotPw")}</a>
                  <button
                    onClick={login}
                    disabled={isLoading}
                    className="btn btn-neutral mt-2"
                  >
                    {isLoading ? (
                      <span className="loading loading-spinner loading-xs" />
                    ) : (
                      t("login")
                    )}
                  </button>
                </>
              )}

              {/* Divider if multiple logins methods are active */}
              {allowEmailSignIn &&
                (allowEntraIdSignIn || allowCanvasSignIn) && (
                  <div className="divider text-xs text-base-content/40">
                    {t("or")}
                  </div>
                )}

              {/* Entra ID / Microsoft login */}
              {allowEntraIdSignIn && (
                <button
                  onClick={login}
                  disabled={isLoading}
                  className="btn bg-[#2F2F2F] text-white border-black"
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-xs" />
                  ) : (
                    <>
                      <svg
                        aria-label="Microsoft logo"
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M96 96H247V247H96" fill="#f24f23" />
                        <path d="M265 96V247H416V96" fill="#7eba03" />
                        <path d="M96 265H247V416H96" fill="#3ca4ef" />
                        <path d="M265 265H416V416H265" fill="#f9ba00" />
                      </svg>
                      {t("sso.microsoft")}
                    </>
                  )}
                </button>
              )}

              {/* Canvas login */}
              {allowCanvasSignIn && (
                <button
                  disabled={isLoading}
                  className="btn bg-[#da222b] text-white border-[#a61a20]"
                >
                  <img
                    src={canvasLogo}
                    alt="Canvas logo"
                    width="20"
                    height="20"
                    className="inline-block brightness-0 invert"
                  />
                  {t("sso.canvas")}
                </button>
              )}

              {/* Dynamic consent text */}
              {getConsentText() && (
                <p className="text-xs text-base-content/40 text-center mt-2">
                  {getConsentText()}
                </p>
              )}
              <p className="text-xs text-base-content/40 text-center mt-2">
                {getConsentText()}{" "}
                <button
                  onClick={() => setIsPrivacyOpen(true)}
                  className="link link-primary text-xs"
                >
                  {t("privacy.linkText")}
                </button>
              </p>

              <PrivacyModal
                isOpen={isPrivacyOpen}
                onClose={() => setIsPrivacyOpen(false)}
              />
            </fieldset>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthenticationForm;
