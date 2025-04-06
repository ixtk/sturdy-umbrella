import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext({
  user: null,
  loading: false
})

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    loading: true
  })

  console.log(auth.user)

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
    <AuthContext.Provider value={{ auth: auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
