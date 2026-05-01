import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../config/authConfig";

/**
 * useAuth
 *
 * Custom hook for handling authentication with Microsoft Entra ID via MSAL.
 * Provides authentication state and login/logout actions to components.
 *
 * @returns Authentication state and actions:
 * - isAuthenticated: Whether the user is currently logged in
 * - isLoading: Whether an authentication action is in progress
 * - user: The active MSAL account object, or null if not logged in
 * - userId: The user's local account ID from Microsoft Entra ID
 * - login: Triggers Microsoft login redirect
 * - logout: Triggers Microsoft logout redirect
 *
 * @example
 * const { isAuthenticated, isLoading, user, login, logout } = useAuth();
 *
 * if (isLoading) return <Spinner />;
 * if (!isAuthenticated) return <LoginButton onClick={login} />;
 */
export const useAuth = () => {
  const { accounts, inProgress, instance } = useMsal();

  // Prefer explicitly set active account, fall back to first available account
  const activeAccount = instance.getActiveAccount() ?? accounts[0] ?? null;

  /**
   * Initiates Microsoft Entra ID login via redirect.
   * Uses loginRequest config from authConfig.ts.
   * The "create" prompt allows new account creation.
   */
  const login = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: "create",
      })
      .catch((error) => console.error(error));
  };

  /**
   * Logs the user out and redirects to the root path.
   */
  const logout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  };

  return {
    isAuthenticated: !!activeAccount,
    isLoading: inProgress !== "none",
    user: activeAccount,
    userId: activeAccount?.localAccountId ?? null,
    login,
    logout,
  };
};
