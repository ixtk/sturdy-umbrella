import express from "express"
import session from "express-session"
import MongoStore from "connect-mongo"
import mongoose from "mongoose"
import { productRouter } from "./routers/productRouter.js"
import { userRouter } from "./routers/userRouter.js"
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
app.use("/users", userRouter)

try {
  await mongoose.connect("mongodb://127.0.0.1:27017/sturdy-umbrella")
  console.log("Connected to the database: sturdy-umbrella")
} catch (error) {
  console.log(error)
}

app.listen(3000, async () => {
  console.log("Running on port 3000")
})
