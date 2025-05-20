import "./shared/App.scss"
import { Route, Routes } from "react-router"
import { HomePage } from "./pages/Home"

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
    </Routes>
  )
}

export default App
