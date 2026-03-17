import { useTranslation } from "react-i18next";
import canvasLogo from "../../assets/canvas-logo.svg";
import { useAuth } from "../../hooks/useAuth";
import {Navigate, useNavigate} from "react-router-dom";
import ChangeLangBtn from "../shared/ChangeLangBtn";
import ThemeControllerToggle from "../shared/ThemeControllerToggle";
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../authConfig.ts';
import {useEffect} from "react";

const AuthenticationForm = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const { instance } = useMsal();
  const { accounts } = useMsal();
  const activeAccount = accounts[0];

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);
  const handleLoginRedirect = () => {
    instance
        .loginRedirect({
          ...loginRequest,
          prompt: 'create',
        })
        .catch((error) => console.log(error));
  };

  const handleLogoutRedirect = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: '/',
    });
    window.location.reload();
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
          {activeAccount ? (
              <button onClick={handleLogoutRedirect}> [ Logout ]</button>

          ) : (
              <button onClick={handleLoginRedirect}> [Login ]</button>
          )}
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
              <button onClick={handleLoginRedirect} className="btn btn-neutral mt-4">
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
