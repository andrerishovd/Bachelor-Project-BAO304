import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loginRequest } from "../config/authConfig";

export const useAuth = () => {
  const { accounts, inProgress, instance } = useMsal();

  const activeAccount = instance.getActiveAccount() ?? accounts[0] ?? null;

  const login = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: "create",
      })
      .catch((error) => console.error(error));
  };

  const logout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  };

  return {
    isAuthenticated: !!activeAccount,
    isLoading: inProgress !== "none",
    user: activeAccount,
    login,
    logout,
  };
};
