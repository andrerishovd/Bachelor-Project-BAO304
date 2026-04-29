import { apiClient } from "../config/axiosConfig";

export const UserService = {
  createOrGetUser: async (token: string): Promise<string> => {
    const res = await apiClient.post<string>("/user/new", null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data; // returnerer intern bruker-ID
  },
};
