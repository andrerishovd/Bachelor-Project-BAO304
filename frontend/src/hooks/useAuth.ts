import { useMsal } from "@azure/msal-react";

export const useAuth = () => {
  const { accounts, inProgress, instance } = useMsal();

  const activeAccount = instance.getActiveAccount() ?? accounts[0] ?? null;

  return {
    isAuthenticated: !!activeAccount,
    isLoading: inProgress !== "none",
    user: activeAccount,
  };
};