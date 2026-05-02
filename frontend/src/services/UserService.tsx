import { apiClient } from "../config/axiosConfig";

/**
 * UserService
 *
 * Handles communication with the user-related API endpoints.
 * Responsible for creating or retrieving a user in the backend
 * based on the Microsoft Entra ID authentication token.
 *
 * @see AuthProvider - Calls createOrGetUser on LOGIN_SUCCESS
 */

export const UserService = {

  /**
   * Creates a new user or retrieves an existing one based on the JWT token.
   *
   * Sends the Microsoft Entra ID access token to the backend, which
   * verifies the token and either creates a new user or returns the
   * existing user's internal ID.
   *
   * @param token - Microsoft Entra ID access token from MSAL
   * @returns The internal user ID as a string
   *
   * @example
   * const userId = await UserService.createOrGetUser(result.accessToken);
   * localStorage.setItem("internalUserId", userId);
   */

  createOrGetUser: async (token: string): Promise<string> => {
    const res = await apiClient.post<string>("/user/new", null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};
