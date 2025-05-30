import asyncHandler from "express-async-handler"
import { Product } from "../models.js"
import { CustomError } from "../middleware.js"

export const createProduct = asyncHandler(async (req, res) => {
  const newProductValues = req.body
  const newProduct = await Product.create(newProductValues)
  res.status(201).json(newProduct)
})

export const addReview = asyncHandler(async (req, res) => {
  const reviewValues = req.body
  const product = await Product.findById(req.params.id)

  if (!product) {
    throw new CustomError("Product not found", 404)
  }

  product.reviews.push(reviewValues)
  await product.save()
  res.status(201).json(product.reviews)
})

export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id).populate(
    "reviews.authorId",
    "username"
  )
  throw new CustomError("Product not found", 404)
  if (!product) {
    throw new CustomError("Product not found", 404)
  }

  res.json(product)
})

export const deleteReview = asyncHandler(async (req, res) => {
  const { productId, reviewId } = req.params
  const product = await Product.findById(productId)

  if (!product) {
    throw new CustomError("Product not found", 404)
  }

  const reviewToDelete = await product.reviews.id(reviewId)

  if (!reviewToDelete) {
    throw new CustomError("Review not found", 404)
  }

  await reviewToDelete.deleteOne()
  const updatedProduct = await product.save()
  res.json(updatedProduct.reviews)
})

export const getProductList = asyncHandler(async (req, res) => {
  const products = await Product.find()
  res.json(products)
})
