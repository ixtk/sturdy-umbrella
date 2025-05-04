import "./App.scss"
import { Route, Routes } from "react-router"
import { HomePage } from "./pages/Home"
import { OrdersPage } from "./dashboard/OrdersPage"

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/orders" element={<OrdersPage />} />
    </Routes>
  )
}

export default App
