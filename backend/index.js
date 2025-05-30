import express from "express"
import mongoose from "mongoose"
import { productRouter } from "./routers/productRouter.js"
import { userRouter } from "./routers/userRouter.js"
import { errorHandler } from "./middleware.js"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

export const app = express()

const MONGODB_URL = process.env.MONGODB_URL
const PORT = process.env.PORT || 3000
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173"

app.use(express.json())
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true
  })
)

app.use("/products", productRouter)
app.use("/users", userRouter)

app.use(errorHandler)

try {
  await mongoose.connect(MONGODB_URL)
  console.log(`Connected to the database: ${MONGODB_URL}`)
} catch (error) {
  console.error("Database connection error:", error)
  process.exit(1)
}

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
})
