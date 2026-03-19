import { EventType, PublicClientApplication } from "@azure/msal-browser";
import type { AuthenticationResult } from "@azure/msal-browser";
import { msalConfig } from "../config/authConfig";
import { MsalProvider } from "@azure/msal-react";
import { useState, useEffect, type ReactNode } from "react";

export const msalInstance = new PublicClientApplication(msalConfig);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
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

    const callbackId = msalInstance.addEventCallback((event) => {
      if (event.eventType === EventType.LOGIN_SUCCESS) {
        const result = event.payload as AuthenticationResult;
        if (result.account) {
          msalInstance.setActiveAccount(result.account);
        }
      }
    });

    init();

    return () => {
      if (callbackId) msalInstance.removeEventCallback(callbackId);
    };
  }, []);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
};
