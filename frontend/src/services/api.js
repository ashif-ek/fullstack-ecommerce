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
   REFRESH CONTROL (CRITICAL)
================================ */

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

/* ===============================
   RESPONSE INTERCEPTOR
================================ */

Api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      // Prevent infinite retry
      originalRequest._retry = true;

      // If refresh already running, queue the request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return Api(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const res = await Api.post("/auth/refresh/");
        const newToken = res.data?.access;

        if (!newToken) {
          throw new Error("Refresh returned no access token");
        }

        setAccessToken(newToken);
        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return Api(originalRequest);

      } catch (refreshError) {
        processQueue(refreshError, null);

        // HARD LOGOUT (correct behavior)
        clearAccessToken();
        window.location.href = "/login";

        return Promise.reject(refreshError);

      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default Api;
