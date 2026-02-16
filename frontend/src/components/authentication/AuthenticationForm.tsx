import { useTranslation } from "react-i18next";
import canvasLogo from "../../assets/canvas-logo.svg";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ChangeLangBtn from "../shared/ChangeLangBtn";
import ThemeControllerToggle from "../shared/ThemeControllerToggle";

const AuthenticationForm = () => {
  const { t, i18n } = useTranslation("auth");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("🔐 Login knapp trykket");
    login();
    console.log("✅ Login kalt, navigerer til /");
    navigate("/");
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="absolute top-4 right-4 flex gap-2">
        <ChangeLangBtn />
        <ThemeControllerToggle />
      </div>

      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">{t("description.header")}</h1>
          <p className="py-6">{t("description.info")}</p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              <label className="label">{t("email")}</label>
              <input type="email" className="input" placeholder={t("email")} />
              <label className="label">{t("password")}</label>
              <input
                type="password"
                className="input"
                placeholder={t("password")}
              />
              <div>
                <a className="link link-hover">{t("forgotPw")}</a>
              </div>
              <button onClick={handleLogin} className="btn btn-neutral mt-4">
                {t("login")}
              </button>

              <button className="btn bg-[#da222b] text-white border-[#a61a20]">
                <img
                  src={canvasLogo}
                  alt="Canvas logo"
                  width="20"
                  height="20"
                  className="inline-block brightness-0 invert"
                />
                {t("ssoCanvas")}
              </button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationForm;
