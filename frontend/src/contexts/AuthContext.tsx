import { EventType, PublicClientApplication } from "@azure/msal-browser";
import type { AuthenticationResult } from "@azure/msal-browser";
import { msalConfig } from "../config/authConfig";
import { MsalProvider } from "@azure/msal-react";
import { useState, useEffect, type ReactNode } from "react";
import useDelayedBoolean from "../hooks/useDelayedBoolean";
import { UserService } from "../services/UserService";
import { useAlertContext } from "./AlertContext";
import { useTranslation } from "react-i18next";

/**
 * Shared MSAL instance used across the application.
 * Initialized once and reused to avoid multiple instances.
 */
export const msalInstance = new PublicClientApplication(msalConfig);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider
 *
 * Initializes MSAL and wraps the application with MsalProvider.
 * Handles redirect callbacks from Microsoft Entra ID and ensures
 * the active account is set correctly after login.
 *
 * On LOGIN_SUCCESS:
 * - Sets the active MSAL account
 * - Creates or retrieves the internal user via UserService
 * - Stores the internal user ID in localStorage for use across the app
 *
 * Shows a loading spinner if initialization takes longer than 1.5 seconds,
 * preventing a flash of unauthenticated content.
 *
 * Note: AlertContext is not available here as AuthProvider wraps MsalProvider
 * which is a sibling of AlertProvider. Errors are logged to the console.
 * User-facing errors are handled downstream where AlertContext is available.
 *
 * @param children - The application component tree
 *
 * @example
 * // main.tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isReady, setIsReady] = useState(false);
  const showSpinner = useDelayedBoolean(!isReady, 1500);
  const { showError } = useAlertContext();
  const { t } = useTranslation("auth");
  useEffect(() => {
    /**
     * Handles the redirect promise from Microsoft Entra ID.
     * Required to complete the login flow after redirect.
     * Sets the active account if one exists but is not yet active.
     */
    const init = async () => {
      try {
        await msalInstance.handleRedirectPromise();

        if (
          !msalInstance.getActiveAccount() &&
          msalInstance.getAllAccounts().length > 0
        ) {
          msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
        }
      } finally {
        setIsReady(true);
      }
    };

    /**
     * Listens for MSAL events and handles LOGIN_SUCCESS.
     * Creates or retrieves the internal user ID from the backend
     * and stores it in localStorage for use in settings and other services.
     */
    const callbackId = msalInstance.addEventCallback(async (event) => {
      if (event.eventType === EventType.LOGIN_SUCCESS) {
        const result = event.payload as AuthenticationResult;
        if (result.account) {
          msalInstance.setActiveAccount(result.account);

          try {
            const userId = await UserService.createOrGetUser(
              result.accessToken,
            );
            localStorage.setItem("internalUserId", userId);
          } catch (err) {
            console.error("Failed to create or retrieve user:", err);
            showError(t("userCreateError"));
          }
        }
      }
    });

    init();

    // Cleanup: remove event callback on unmount
    return () => {
      if (callbackId) msalInstance.removeEventCallback(callbackId);
    };
  }, []);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-screen">
        {showSpinner && <span className="loading loading-spinner loading-lg" />}
      </div>
    );
  }

  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
};
