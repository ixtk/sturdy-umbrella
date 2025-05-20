import { NavLink } from "react-router"
import { useContext } from "react"
import { AuthContext } from "@/lib/AuthContext.jsx"
import { axiosInstance } from "@/lib/axiosInstance.js"

export const Header = () => {
  const { authState, setAuthState } = useContext(AuthContext)

  const logout = async () => {
    await axiosInstance.delete("/users/logout")
    setAuthState({
      user: null
    })
  }

  return (
    <header>
      <nav className="container">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
          </li>
          {authState.user ? (
            <>
              <li>
                <NavLink to="/secret">Secret</NavLink>
              </li>
              <li>
                <NavLink to="/products">Products</NavLink>
              </li>
              <li>
                <NavLink to="/products/1">Demo product</NavLink>
              </li>
              <li>
                <NavLink to="/products/1/edit">Edit demo product</NavLink>
              </li>
              <li>
                <button className="btn btn-outline" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}
