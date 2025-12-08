import axios from "axios";
import { useAuthStore } from "../store";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true, // eta na dile amader cookie jeta server theke ashbe seta browser e save hobe na and request er sathe cookie server e jabe na
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json", // client json data accept korbe
  },
});

const refreshToken = async () => {
  await axios.post(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/refresh`,
    {},
    {
      withCredentials: true,
    }
  );
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      try {
        const headers = { ...originalRequest.headers };
        await refreshToken();
        return api.request({ ...originalRequest, headers });
      } catch (error) {
        console.warn("Error while getting Refresh our Access Token!");
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  }
);
