import { Product } from "../models.js"

export const createProduct = async (req, res) => {
  const newProductValues = req.body

  const newProduct = await Product.create(newProductValues)

  res.status(201).json(newProduct)
}

export const addReview = async (req, res) => {
  const reviewValues = req.body

  const product = await Product.findById(req.params.id)

  product.reviews.push(reviewValues)

  await product.save()

  res.status(201).json(product.reviews)
}

export const getProductById = async (req, res) => {
  // params = { id: "68139926c53d88c7240564cd" }
  const { id } = req.params

  const product = await Product.findById(id).populate(
    "reviews.authorId",
    "username"
  )

  res.json(product)
}

export const deleteReview = async (req, res) => {
  const { productId, reviewId } = req.params

  // console.log(req.params)

  const product = await Product.findById(productId)

  const reviewToDelete = await product.reviews.id(reviewId)

  await reviewToDelete.deleteOne()

  const updatedProduct = await product.save()

  res.json(updatedProduct.reviews)
}

export const getProductList = async (req, res) => {
  const products = await Product.find()

  res.json(products)
}
