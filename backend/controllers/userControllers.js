import bcrypt from "bcrypt"
import { User } from "../models.js"

export const registerUser = async (req, res) => {
  const registerValues = req.body

  const hashedPassword = await bcrypt.hash(registerValues.password, 12)

  const newUser = await User.create({
    username: registerValues.username,
    email: registerValues.email,
    password: hashedPassword
  })
  req.session.userId = newUser._id.toString()

  res.status(201).json({
    user: {
      username: newUser.username,
      email: newUser.email
    }
  })
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  const existingUser = await User.findOne({ email }).exec()

  if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
    req.session.userId = existingUser._id.toString()
    return res.json({
      message: "Logged in",
      user: {
        username: existingUser.username,
        email: existingUser.email
      }
    })
  }

  res.status(401).json({ message: "Email or password incorrect" })
}

export const logoutUser = async (req, res) => {
  req.session.destroy()
  res.clearCookie("connect.sid")

  res.json({ message: "Logged out" })
}

export const checkUserStatus = async (req, res) => {
  // სატესტო დაყოვნებისთვის
  // await fetch('http://httpbin.org/delay/2')

  res.json({ user: req.user })
}

export const getSecretMsg = (req, res) => {
  res.json({ secret: "2 x 2 = 4" })
}
