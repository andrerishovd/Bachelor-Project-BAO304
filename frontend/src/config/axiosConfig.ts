import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8010/api";

const msalInstance = new PublicClientApplication(msalConfig);

/**
 * Pre-configured Axios instance for API communication.
 *
 * @baseURL Reads from VITE_API_BASE_URL env variable, falls back to localhost
 * @timeout 10 seconds
 * @headers Content-Type set to JSON
 *
 * @interceptors
 * - Request: Ready for auth token injection (see TODO below)
 * - Response: Centralized error logging for all API calls
 *
 * @usage
 * import { apiClient } from "@/config/axiosConfig";
 * const response = await apiClient.get("/chat/all");
 */

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

msalInstance.initialize().then(() => {
  // Request interceptor - runs before every outgoing request
  apiClient.interceptors.request.use(
    async (config) => {
      const account = msalInstance.getActiveAccount();
      if (account) {
        const tokenResponse = await msalInstance.acquireTokenSilent({
          account: account,
          scopes: [
            "https://aprikoscompany.onmicrosoft.com/42d48df1-2ab8-498a-8378-bd0e003d6f14/access_as_user",
          ],
        });
        config.headers.Authorization = `Bearer ${tokenResponse.accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
});

// Response interceptor (error handling) runs on every incoming response
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with a non-2xx status code
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      // Request was made but no response received (e.g. backend is down)
      console.error("Network Error:", error.message);
    } else {
      // Something went wrong setting up the request
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  },
);
