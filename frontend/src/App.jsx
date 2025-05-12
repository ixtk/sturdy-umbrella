import "./App.scss"
import { Route, Routes } from "react-router"
import { HomePage } from "./pages/Home"
import { AuthPage } from "./pages/AuthPage"
import {ProductPage} from './pages/ProductPage'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/product" element={<ProductPage/>}></Route>
    </Routes>
  )
}

export default App
