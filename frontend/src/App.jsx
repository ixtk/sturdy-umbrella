import "@/shared/App.scss"
import { Route, Routes, Navigate, Outlet } from "react-router"
import { useContext } from "react"
import { AuthContext } from "@/lib/AuthContext.jsx"
import { Layout } from "@/shared/Layout.jsx"
import { LoginPage } from "@/pages/login/LoginPage.jsx"
import { RegisterPage } from "@/pages/register/RegisterPage.jsx"
import { LoaderCircle } from "lucide-react"
import { ProductsPage } from "@/pages/products/ProductsPage.jsx"

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <LoaderCircle />
    </div>
  )
}

function App() {
  const ProtectedRoute = () => {
    const { authState } = useContext(AuthContext)

    if (authState.loading) {
      return <LoadingSpinner />
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
      return <LoadingSpinner />
    }

    if (authState.user !== null) {
      return <Navigate to="/" />
    } else {
      return <Outlet />
    }
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route element={<RedirectIfLoggedIn />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/secret" element={<h1>2 x 2 = 4</h1>} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
