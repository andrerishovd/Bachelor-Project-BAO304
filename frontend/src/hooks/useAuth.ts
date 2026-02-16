import { useState } from "react";

// bare for testing...

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return {
    isAuthenticated,
    login,
    logout,
  };
};
