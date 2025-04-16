import "./App.scss"
import { Route, Routes } from "react-router"
import { HomePage } from "./pages/Home"
import { Orders } from "./dashboard/Orders"

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  )
}

export default App
