/* eslint-disable no-unused-vars */
import axios from "axios";
import { useAuth } from "./AuthContext"; // Adjust the path as needed

// Create an Axios instance with default configuration
const apiClient = axios.create({
  // baseURL: "http://localhost:8080", // Your backend base URL
  baseURL: "https://dms.wishalpha.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensures cookies are sent with requests
});

export const setupInterceptors = (token, setToken) => {
  //Request interceptor to attach the Authorization token
  apiClient.interceptors.request.use(
    async (config) => {
      // const {setUser} = useAuth(); // Retrieve token from AuthContext
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`.trim(); // Ensure proper token formatting
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Function to refresh the access token
  const refreshToken = async () => {
    try {
      const response = await apiClient.post("/api/auth/refresh");
      // const response = await axios.post("http://localhost:8080/api/auth/refresh", {
      //   withCredentials: true,
      // });
      console.log(response);
     
      if (response?.data.token) {
        console.log("Token refreshed successfully:", response);
        return response.data.token;
      }
      // throw new Error("No access token in response");
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error; // Rethrow to handle it in the response interceptor
    }
  };

  // Response interceptor for handling token expiration
  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // Check for 403 (Forbidden) and that the request hasn't been retried
      if ((error.response?.status === 403 || error.response?.status === 401) && !originalRequest._retry) {
        originalRequest._retry = true; // Mark the request as retried

        try {
          const token = await refreshToken(); // Call refreshToken to get a new access token
          console.log(token);
          
          if (token) {
            // Store the new access token
            setToken(token);

            // Update Axios default headers and retry the original request
            apiClient.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${token}`;
            originalRequest.headers["Authorization"] = `Bearer ${token}`;

            return apiClient(originalRequest); // Retry the original request
          }
        } catch (refreshError) {
          console.error("Failed to refresh token:", refreshError);
          localStorage.removeItem("ACCESS_TOKEN");
          localStorage.removeItem("USER_DATA")
          return Promise.reject(refreshError); // Reject if token refresh fails
        }
      }

      return Promise.reject(error); // Propagate other errors
    }
  );
};

export default apiClient;

// const retryRequest = (originalRequest, attempt = 1) => {
//   const maxAttempts = 3;
//   const retryDelay = 2000; // Retry after 2 seconds

//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       axios(originalRequest)
//         .then(resolve)
//         .catch((error) => {
//           if (attempt < maxAttempts) {
//             console.log(`Retrying request... Attempt ${attempt + 1}`);
//             resolve(retryRequest(originalRequest, attempt + 1));
//           } else {
//             reject(error);
//           }
//         });
//     }, retryDelay);
//   });
// };

// Retry request for specific cases (like network error)
// if (!error.response) {
//   return retryRequest(originalRequest);
// }

// async (error) => {
//   // Handle the response error when a response is received
//   console.error("Response Error:", error);

// // Check if JWT expired based on response data
// if (error.response.status === 401 && error.response.data.detail.includes("JWT expired")) {
//   const originalRequest = error.config;

//   if (!originalRequest._retry) {
//     originalRequest._retry = true;
//     try {
//       console.log("Attempting token refresh with refreshToken:", _refreshToken);
//       const refreshResponse = await axios.post(
//         "http://localhost:8080/api/auth/refresh",
//         { headers: { Authorization: `Bearer ${_refreshToken}` } }
//       );
//       console.log("Refresh Token Response:", refreshResponse.data);

//       const newToken = refreshResponse.data.token;
//       const newRefreshToken = refreshResponse.data.refreshToken;
//       const refreshData = refreshResponse.data.data;
//       setToken(newToken);
//       setRefreshToken(newRefreshToken);
//       setUser(refreshData);

//       originalRequest.headers.Authorization = `Bearer ${newToken}`;
//       return apiClient(originalRequest);
//     } catch (refreshError) {
//       console.error("Failed to refresh token:", refreshError);
//       logout();
//     }
//   }
// }

// return Promise.reject(error);
// }
