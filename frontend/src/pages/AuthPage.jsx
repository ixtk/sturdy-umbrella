import { useState } from "react"
import "./Auth.scss"
import { cn } from "../utils"

export const AuthPage = () => {
  // login or register
  const [activeForm, setActiveForm] = useState("login")

  return (
    <div className="form-container">
      <div className="form-switch">
        <button
          onClick={() => setActiveForm("login")}
          className={cn("switch-btns", activeForm === "login" && "active-btn")}
        >
          Login
        </button>
        <button
          onClick={() => setActiveForm("register")}
          className={cn(
            "switch-btns",
            activeForm === "register" && "active-btn"
          )}
        >
          Register
        </button>
      </div>
      <form className="auth-form">
        <h2 className="form-title">{activeForm}</h2>
        <p className="form-desc">
          {activeForm === "login"
            ? "Enter your credentials to access your account"
            : "Enter your information to create an account"}
        </p>
        {activeForm === "register" && (
          <>
            <div className="input-group">
              <label>Username</label>
              <input placeholder="John Doe" type="text" />
            </div>
          </>
        )}
        <div className="input-group">
          <label>Email</label>
          <input placeholder="name@example.com" type="email" />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" />
        </div>
        {activeForm === "register" && (
          <>
            <div className="input-group">
              <label>Confirm Password</label>
              <input type="password" />
            </div>
          </>
        )}
        <button className="submit-btn">{activeForm}</button>
      </form>
    </div>
  )
}
