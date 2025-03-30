import "./Home.scss"
import { useContext } from "react"
import { AuthContext } from "../AuthContext"

export const HomePage = () => {
  const { auth } = useContext(AuthContext)

  return <h1 className="title">Hello {auth.user?.username}</h1>
}
