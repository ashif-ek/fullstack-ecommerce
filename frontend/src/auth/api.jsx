// // import axios from "axios";


// // const Api = axios.create({
// //   baseURL: "https://noirel-server.onrender.com",
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// // });

// // export default Api



// import axios from "axios";


// const Api = axios.create({
//   baseURL: "http://127.0.0.1:8000/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default Api


import axios from "axios";

const Api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add access token to headers
Api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token refresh on 401
Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const response = await axios.post(
          "http://127.0.0.1:8000/api/auth/refresh/",
          { refresh: refreshToken },
          { withCredentials: true }
        );

        const newAccessToken = response.data.access;
        localStorage.setItem("access_token", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return Api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, user needs to login again
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default Api;