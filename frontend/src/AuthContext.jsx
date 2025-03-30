import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext({
  user: null
})

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null
  })

  useEffect(() => {
    const getStatus = async () => {
      const response = await fetch("http://localhost:3000/user/status", {
        credentials: "include"
      })

      const json = await response.json()

      setAuth(json)
    }

    getStatus()
  }, [])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
