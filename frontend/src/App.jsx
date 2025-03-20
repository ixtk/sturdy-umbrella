import "./App.scss"
import { Route, Routes } from "react-router"
import { HomePage } from "./pages/Home"
import { AuthPage } from "./pages/AuthPage"

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  )
}

export default App
