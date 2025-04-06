import "./Home.scss"
import { useContext } from "react"
import { AuthContext } from "../AuthContext"
import { Link, useNavigate } from "react-router"

export const HomePage = () => {
  const { auth } = useContext(AuthContext)
  const navigate = useNavigate()

  const logoutUser = async () => {
    const response = await fetch("http://localhost:3000/user/logout", {
      method: "DELETE",
      credentials: "include"
    })

    if (response.ok) {
      navigate("/auth")
    }
  }

  return (
    <>
      {auth.user === null ? (
        <Link to="/auth">Auth</Link>
      ) : (
        <button onClick={logoutUser}>Logout</button>
      )}

      <h1 className="title">Hello {auth.user?.username}</h1>
    </>
  )
}
