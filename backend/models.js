import mongoose from "mongoose"

const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
})

const UserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true
    },
    cartItems: {
      type: [CartItemSchema]
    },
    providerUserId: {
      required: true,
      type: String,
      unique: true
    }
  },
  { timestamps: true }
)

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    regularPrice: {
      type: Number,
      required: true
    },
    salePrice: Number,
    isOnSale: Boolean,
    description: String,
    images: [String],
    reviews: [
      {
        starRating: { required: true, type: Number },
        title: { required: true, type: String },
        description: String,
        authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
      }
    ],
    category: String
  },
  { timestamps: true }
)

export const User = mongoose.model("User", UserSchema)
export const Product = mongoose.model("Product", ProductSchema)
