import "./App.scss"
import { Route, Routes, Navigate, Outlet } from "react-router"
import { HomePage } from "./pages/Home"
import { OrdersPage } from "./dashboard/OrdersPage"
import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"

function App() {
  const ProtectedRoute = () => {
    const { authState } = useContext(AuthContext)

    if (authState.loading) {
      return null
    }

    if (authState.user !== null) {
      return <Outlet />
    } else {
      return <Navigate to="/login" />
    }
  }

  const RedirectIfLoggedIn = () => {
    const { authState } = useContext(AuthContext)

    if (authState.loading) {
      return null
    }

    if (authState.user !== null) {
      return <Navigate to="/" />
    } else {
      return <Outlet />
    }
  }

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route element={<RedirectIfLoggedIn />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/secret" element={<h1>2 x 2 = 4</h1>} />
      </Route>
    </Routes>
  )
}

export default App
