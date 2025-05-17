import { AuthContext } from "@/lib/AuthContext.jsx"
import { useContext } from "react"
import { Link, Outlet } from "react-router"

export const Layout = () => {
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
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          {authState.user ? (
            <>
              <Link to="/secret">Secret</Link>
              <Link to="/orders">Orders</Link>
              <Link to="/products">Products</Link>
              <Link to="/products/1">Demo product</Link>
              <Link to="/products/1/edit">Edit demo product</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
