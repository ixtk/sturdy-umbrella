import "./shared/App.scss"
import { Route, Routes, Navigate, Outlet } from "react-router"
import { HomePage } from "./pages/home/Home.jsx"
import { OrdersPage } from "./pages/orders/OrdersPage.jsx"
import { useContext } from "react"
import { AuthContext } from "./lib/AuthContext.jsx"
import { LoginPage } from "./pages/login/LoginPage.jsx"
import { RegisterPage } from "./pages/register/RegisterPage.jsx"
import EditProductPage from "./pages/product-edit/EditProductPage.jsx"
import { ProductListPage } from "./pages/products/ProductListPage.jsx"
import { Layout } from "@/shared/Layout.jsx"
import ProductPage from "@/pages/product/Product.jsx"

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
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="/products" element={<ProductListPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="products/:productId/edit" element={<EditProductPage />} />
        <Route path="products/:productId" element={<ProductPage />} />

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
