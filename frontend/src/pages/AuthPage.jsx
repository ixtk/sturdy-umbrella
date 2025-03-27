import { useState } from "react"
import "./Auth.scss"
import { cn } from "../utils"

export const AuthPage = () => {
  // login or register
  const [activeForm, setActiveForm] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const authUser = async event => {
    event.preventDefault()

    console.log(email, password)

    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        "content-type": "application/json"
      }
    })

    const json = await response.json()

    console.log(json)
  }

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
      <form className="auth-form" onSubmit={authUser}>
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
          <input
            placeholder="name@example.com"
            type="email"
            onChange={event => setEmail(event.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            onChange={event => setPassword(event.target.value)}
          />
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
