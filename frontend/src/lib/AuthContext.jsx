import { createContext, useEffect, useState } from "react"
import { axiosInstance } from "./axiosInstance.js"

export const AuthContext = createContext({
  loading: true,
  user: null
})

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    loading: true,
    user: null
  })

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await axiosInstance.get("/users/status")
        setAuthState({
          loading: false,
          user: response.data.user
        })
      } catch (error) {
        setAuthState({
          ...authState,
          loading: false
        })
      }
    }

    checkStatus()
  }, [])

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  )
}
