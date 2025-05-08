import express from "express"
import session from "express-session"
import MongoStore from "connect-mongo"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { loginSchema, registerSchema } from "./schema.js"
import { validateSchema, verifyAuth } from "./middleware.js"
import { User } from "./models.js"
import { productRouter } from "./routers/productRouter.js"
import cors from "cors"

export const app = express()

app.use(
  session({
    // HIDE IN PROD!
    secret: "super secret",
    resave: false,
    saveUninitialized: false,
    // rolling: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 3,
      httpOnly: true
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/sturdy-umbrella",
      stringify: false
    })
  })
)
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
)

app.use("/products", productRouter)

app.get("/secret", verifyAuth, (req, res) => {
  res.json({ secret: "2 x 2 = 4" })
})

app.post(
  "/users/register",
  validateSchema(registerSchema),
  async (req, res) => {
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
)

app.post("/users/login", validateSchema(loginSchema), async (req, res) => {
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
})

app.delete("/users/logout", async (req, res) => {
  req.session.destroy()
  res.clearCookie("connect.sid")

  res.json({ message: "Logged out" })
})

app.get("/users/status", verifyAuth, async (req, res) => {
  // სატესტო დაყოვნებისთვის
  // await fetch('http://httpbin.org/delay/2')

  res.json({ user: req.user })
})

app.listen(3000, async () => {
  console.log("Running on port 3000")
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/sturdy-umbrella")
    console.log("Connected to the database: sturdy-umbrella")
  } catch (error) {
    console.log(error)
  }
})
