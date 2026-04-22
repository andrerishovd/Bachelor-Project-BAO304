import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "42d48df1-2ab8-498a-8378-bd0e003d6f14",
    authority:
      "https://login.microsoftonline.com/6c4f8c71-3b78-4ca0-8562-d6d69c7f36d7",
    redirectUri: "http://localhost:5173/",
    //postLogoutRedirectUri: 'http://localhost:5173',
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: any, message: any, containsPii: any) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: [],
};
