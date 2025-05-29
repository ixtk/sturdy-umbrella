import { Outlet } from "react-router"
import { Header } from "@/shared/Header.jsx"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { axiosInstance } from "@/lib/axiosInstance.js"
import {auth} from "@/lib/firebase.js"

export const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(auth.currentUser))

  useEffect(() => {
    let interceptorId = null;

    // user either logged in or logged out
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // if user logged in
      if (user) {
        console.log(user)
        setIsLoggedIn(true)
        console.log('current user logged in: true')
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
      }
      // user has logged out
      else {
        if (interceptorId !== null) {
          axiosInstance.interceptors.request.eject(interceptorId);
          interceptorId = null;
        }
        setIsLoggedIn(false)
        console.log('current user logged in: false')
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
    <>
      <Header />
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  )
}
