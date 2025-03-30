import { createContext, useState } from "react"

export const AuthContext = createContext({
  user: null
})

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null
  })

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
