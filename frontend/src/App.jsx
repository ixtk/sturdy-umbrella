import "@/shared/App.scss"
import { Route, Routes, Navigate, Outlet } from "react-router"
import { Layout } from "@/shared/Layout.jsx"
// import { LoaderCircle } from "lucide-react"
import { ProductsPage } from "@/pages/products/ProductsPage.jsx"
import { ProductPage } from "@/pages/product/ProductPage.jsx"
import { auth } from "@/lib/firebase.js"

// const LoadingSpinner = () => {
//   return (
//     <div className="loading-spinner">
//       <LoaderCircle />
//     </div>
//   )
// }

function App() {
  const ProtectedRoute = () => {
    if (auth.currentUser) {
      return <Outlet />
    } else {
      return <Navigate to="/login" />
    }
  }

  const RedirectIfLoggedIn = () => {
    if (auth.currentUser) {
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
        <Route path="/products/:productId" element={<ProductPage />} />

        <Route element={<RedirectIfLoggedIn />}>
        {/*  */}
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/secret" element={<h1>2 x 2 = 4</h1>} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
