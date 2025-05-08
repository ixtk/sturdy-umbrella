import express from "express"
import {
  addReview,
  createProduct,
  getProductById
} from "../controllers/productControllers.js"

export const productRouter = new express.Router()

productRouter.post("/", createProduct)
productRouter.post("/:id/review", addReview)
productRouter.get("/:id", getProductById)
