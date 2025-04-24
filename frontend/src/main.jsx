import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import { BrowserRouter } from "react-router"
import Review from "./pages/reviews.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* <App /> */}
    </BrowserRouter>
      <Review/>
  </StrictMode>
)
