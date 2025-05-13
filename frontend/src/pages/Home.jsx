import "./Home.scss"
import { AuthContext } from "../AuthContext.jsx"
import { useContext } from "react"
import { Link } from "react-router"

export const HomePage = () => {
  const { authState, setAuthState } = useContext(AuthContext)

  const logout = async () => {
    const response = await fetch("http://localhost:3000/users/logout", {
      method: "DELETE",
      credentials: "include"
    })

    setAuthState({
      user: null
    })
  }

  return (
    <div>
      <nav style={{ display: "flex", gap: "16px" }}>
        <Link to="/">Home</Link>

        {authState.user ? (
          <>
            <Link to="/secret">Secret</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <h1 className="title">Welcome</h1>
      <h2>{authState.user && authState.user.username}</h2>
    </div>
  )
}
