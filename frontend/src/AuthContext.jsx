import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext({
  user: null,
  loading: true
})

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    loading: true
  })

  useEffect(() => {
    const checkStatus = async () => {
      const response = await fetch("http://localhost:3000/users/status", {
        credentials: "include"
      })

      const json = await response.json()

      setAuthState({ user: json.user, loading: false })
    }

    checkStatus()
  }, [])

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  )
}
