import express from "express"
import { verifyAuth } from "../middleware.js"
import {
  getSecretMsg,
  socialAuth
} from "../controllers/userControllers.js"

export const userRouter = new express.Router()

userRouter.post("/social-auth", verifyAuth, socialAuth)
userRouter.get("/secret", verifyAuth, getSecretMsg)
