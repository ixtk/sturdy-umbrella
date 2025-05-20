import { Outlet } from "react-router"
import { Header } from "@/shared/Header.jsx"

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  )
}
