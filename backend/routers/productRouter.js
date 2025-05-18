import express from "express"
import {
  addReview,
  createProduct,
  getProductById,
  deleteReview,
  getProductList
} from "../controllers/productControllers.js"

export const productRouter = new express.Router()

productRouter.post("/", createProduct)
productRouter.post("/:id/review", addReview)
productRouter.delete("/:productId/review/:reviewId", deleteReview)
productRouter.get("/:id", getProductById)
productRouter.get("/", getProductList)
