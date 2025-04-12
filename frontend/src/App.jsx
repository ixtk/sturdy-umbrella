import "./App.scss"
import { Route, Routes } from "react-router"
import { HomePage } from "./pages/Home"
import EditProductPage from "./pages/EditProduct"

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="products/:productId" element={<EditProductPage />} />
    </Routes>
  )
}

export default App
