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
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 40
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      minLength: 5,
      maxLength: 45,
      match: /^\S+@\S+\.\S+$/
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true
    },
    cartItems: {
      type: [CartItemSchema]
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
