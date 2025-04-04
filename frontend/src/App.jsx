import "./App.scss"
import { Route, Routes } from "react-router"
import ProductList from "./pages/Home"

function App() {
  return (
    <Routes>
      <Route index element={<ProductList />} />
    </Routes>
  )
}

export default App
