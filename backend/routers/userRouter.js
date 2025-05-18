import express from "express"
import { validateSchema, verifyAuth } from "../middleware.js"
import { loginSchema, registerSchema } from "../schema.js"
import {
  checkUserStatus,
  getSecretMsg,
  loginUser,
  logoutUser,
  registerUser
} from "../controllers/userControllers.js"

export const userRouter = new express.Router()

userRouter.post("/register", validateSchema(registerSchema), registerUser)
userRouter.post("/login", validateSchema(loginSchema), loginUser)
userRouter.delete("/logout", logoutUser)
userRouter.get("/status", verifyAuth, checkUserStatus)
userRouter.get("/secret", verifyAuth, getSecretMsg)
