import { createContext, useEffect, useState } from "react"
import { axiosInstance } from "./axiosInstance.js"
import { getAuth, onAuthStateChanged } from "firebase/auth"

export const AuthContext = createContext({
  authState: {
    loading: true,
    user: null
  }
})

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    loading: true,
    user: null
  })

  useEffect(() => {
    const auth = getAuth();
    let interceptorId = null;

    // user either logged in or logged out
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // if user logged in
      if (user) {
        // check if we already have an interceptor, if so, remove the old one
        if (interceptorId !== null) {
          axiosInstance.interceptors.request.eject(interceptorId);
        }

        // add the new interceptor (just sends user JWT token to backend on EVERY request)
        interceptorId = axiosInstance.interceptors.request.use(async (config) => {
          const token = await user.getIdToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        });

        // now that interceptor is added, check status normally
        try {
          const response = await axiosInstance.get("/users/status");
          console.log(response.data);
          setAuthState({
            loading: false,
            user: response.data.user
          });
        } catch (error) {
          setAuthState({
            loading: false,
            user: null
          });
        }
      }
      // user has logged out
      else {
        if (interceptorId !== null) {
          axiosInstance.interceptors.request.eject(interceptorId);
          interceptorId = null;
        }
        setAuthState({
          loading: false,
          user: null
        });
      }
    });

    return () => {
      if (interceptorId !== null) {
        axiosInstance.interceptors.request.eject(interceptorId);
      }
      unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  )
}
