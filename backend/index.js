import express from "express"
import mongoose from "mongoose"
import { productRouter } from "./routers/productRouter.js"
import { userRouter } from "./routers/userRouter.js"
import cors from "cors"

export const app = express()

const MONGODB_URL = "mongodb://127.0.0.1:27017/fluffy-umbrella"

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
  await mongoose.connect(MONGODB_URL)
  console.log("Connected to the database: fluffy-umbrella")
} catch (error) {
  console.log(error)
}

app.listen(3000, async () => {
  console.log("Running on port 3000")
})
