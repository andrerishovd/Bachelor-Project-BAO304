// src/config/axiosConfig.ts
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

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

// Request interceptor - runs before every outgoing request
apiClient.interceptors.request.use(
  (config) => {
    // TODO: Add auth token when authentication is implemented
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

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
