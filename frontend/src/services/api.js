import axios from "axios";

/*
  VITE_API_URL example:
  http://localhost:8000/api
*/
const API_BASE_URL = import.meta.env.VITE_API_URL;

const Api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===============================
   ACCESS TOKEN (LocalStorage)
================================ */

const ACCESS_TOKEN_KEY = "access_token";

let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

export const setAccessToken = (token) => {
  accessToken = token;
  if (token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
};

export const clearAccessToken = () => {
  accessToken = null;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

/* ===============================
   REQUEST INTERCEPTOR
   - Attach access token if present
================================ */

Api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ===============================
   RESPONSE INTERCEPTOR
   - SimpleJWT refresh handling
================================ */

Api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Refresh access token
        const res = await Api.post("/auth/refresh/");
        const newToken = res.data?.access;

        if (!newToken) {
          throw new Error("No access token returned");
        }

        setAccessToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return Api(originalRequest);
      } catch (refreshError) {
        clearAccessToken();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default Api;
