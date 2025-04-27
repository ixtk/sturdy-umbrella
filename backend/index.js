import express from "express"
import mongoose from "mongoose"
import cors from "cors"

const productSchema = new mongoose.Schema(
  {
    name: String,
    color: String,
    price: Number
  },
  { timestamps: true }
)

const Product = mongoose.model("Product", productSchema)

const app = express()

app.use(
  cors({
    origin: "http://localhost:5173"
  })
)
app.use(express.json())

app.get("/products", async (req, res) => {
  const products = await Product.find()
  res.json(products)
})

app.post("/products/seed", async (req, res) => {
  const sampleProducts = [
    { name: "TrailMaster Hiking Boots", color: "Brown", price: 149.99 },
    { name: "CloudStep Walking Shoes", color: "Gray", price: 79.99 },
    {
      name: "UltraGlide Pro Running Shoes",
      color: "Midnight Black",
      price: 129.99
    },
    { name: "AirFlex Casual Sneakers", color: "White/Blue", price: 89.99 }
  ]

  await Product.insertMany(sampleProducts)
  res.send("Sample products created")
})

app.listen(3000, async () => {
  console.log("Running on port 3000")
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/sturdy-umbrella")
    console.log("Connected to the database")
  } catch (error) {
    console.log(error)
  }
})
