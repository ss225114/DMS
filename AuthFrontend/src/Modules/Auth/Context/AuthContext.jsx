/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { createContext, useContext, useEffect, useState } from "react"
import { setupInterceptors } from "./apiClient"
// import { setupInterceptors } from "./apiClient"


const AuthContext = createContext()

export const AuthProvider = ({children}) => {
   
    const [user, _setUser] = useState(JSON.parse(localStorage.getItem("USER_DATA"))??{})
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN")??null)
    // const [_refreshToken, _setRefreshToken] = useState(localStorage.getItem("REFRESH_TOKEN")??null)


    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem("ACCESS_TOKEN", token);
        }else{
            localStorage.removeItem("ACCESS_TOKEN");
        }
    }
   
    const setUser = (data) => {
        _setUser(data)
        if(data){
            localStorage.setItem("USER_DATA", JSON.stringify(data));
        }else{
            localStorage.removeItem("USER_DATA");
        }
    }

    const logout = () => {
        _setUser({});
        setToken(null);
        // setRefreshToken(null);
        localStorage.removeItem("ACCESS_TOKEN");
        // localStorage.removeItem("REFRESH_TOKEN");
        // localStorage.removeItem("USER_DATA");
        window.location.href="/"
    }

      useEffect(() => {
        setupInterceptors(token, setToken);
      }, [token]); // Reinitialize interceptors if either changes


    return (
        <>
            <AuthContext.Provider
            value={{
                token,
                setToken,
                logout,
                user,
                setUser
                }}
            >
                {children}
            </AuthContext.Provider>
        </>
    );
}

export const useAuth = () => useContext(AuthContext)

  // const isTokenValid = (token) => {
    //     if (!token) return false;

    //     try {
    //         const { exp } = jwtDecode(token); // Extract the expiration time
    //         const currentTime = Date.now()// Current time in milliseconds
    //         return exp > currentTime; // Check if the token is still valid
    //     } catch {
    //         return false; // If decoding fails, the token is invalid
    //     }
    // };

    // const refreshAccessToken = async () => {
    //     if (!_refreshToken) {
    //       console.error("No refresh token available. Logging out.");
    //       logout();
    //       return null;
    //     }
      
    //     try {
    //       console.log("Attempting to refresh access token...");
    //       const response = await axios.post("http://localhost:8080/api/auth/refresh", {refreshToken: _refreshToken},
    //       );
      
    //       const newAccessToken = response.data.accessToken;
    //       console.log("New access token received:", newAccessToken);
    //       setToken(newAccessToken);
    //       return newAccessToken;
    //     } catch (error) {
    //       console.error("Failed to refresh token. Logging out:", error);
    //       logout();
    //       return null;
    //     }
    //   };
      
    //   const getValidAccessToken = async () => {
    //     if (isTokenValid(token)) {
    //       console.log("Access token is valid.");
    //       return token;
    //     }
      
    //     console.log("Access token expired. Refreshing...");
    //     return await refreshAccessToken();
    //   };

    // Initialize Axios interceptors
  // useEffect(() => {
  //   setupInterceptors(getValidAccessToken, logout);
  // }, [token, _refreshToken]);

   // Automatically refresh token before it expires
//    useEffect(() => {
//     if (!token) return;

//     const decoded = jwtDecode(token);
//     const expirationTime = decoded.exp * 1000; // Convert to milliseconds
//     const currentTime = Date.now();

//     // Calculate the timeout to refresh the token
//     const timeout = expirationTime - currentTime - 60000; // Refresh 1 minute before expiration

//     if (timeout > 0) {
//         const timer = setTimeout(async () => {
//             await refreshAccessToken();
//         }, timeout);

//         return () => clearTimeout(timer); // Cleanup the timer on unmount or token change
//     }
// }, [token]);

// _refreshToken,
// setRefreshToken



  
    // const isTokenExpired = (token) => {
    //   if (!token) return true;
    //   try {
    //     const { exp } = jwtDecode(token);
    //     return Date.now() >= exp * 1000; // Check if token is expired
    //   } catch (error) {
    //     console.error("Error decoding token:", error);
    //     return true;
    //   }
    // };
    
      // useEffect(() => {
      //   const storedToken = localStorage.getItem("ACCESS_TOKEN");
      //   const storedRefreshToken = localStorage.getItem("REFRESH_TOKEN");
      
      //   if (storedToken && !isTokenExpired(storedToken)) {
      //     _setToken(storedToken);
      //     // setUser(jwtDecode(storedToken)); // Set user from token
          
      //   } else {
      //     localStorage.removeItem("ACCESS_TOKEN");
      //   }
      
      //   if (storedRefreshToken && !isTokenExpired(storedRefreshToken)) {
      //     _setRefreshToken(storedRefreshToken);
      //   } else {
      //     localStorage.removeItem("REFRESH_TOKEN");
      //   }
      // }, []);


      
    // const setRefreshToken = (refreshToken) => {
    //     _setRefreshToken(refreshToken)
    //     if(refreshToken){
    //         localStorage.setItem("REFRESH_TOKEN", refreshToken);
    //     }else{
    //         localStorage.removeItem("REFRESH_TOKEN");
    //     }
    // }