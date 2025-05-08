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

  const product = await Product.findById(id)

  res.json(product)
}
