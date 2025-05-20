import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

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
    category: {
      type: String,
      required: true
    },
    variants: [
      {
        colorName: { type: String, required: true },
        quantity: { type: Number, required: true },
        sizes: [{ men: Number, woman: Number }],
        images: [{ type: String, required: true }]
      }
    ],
    reviews: [
      {
        starRating: { required: true, type: Number },
        title: { required: true, type: String },
        description: String,
        authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
      }
    ]
  },
  { timestamps: true }
)

export const User = mongoose.model("User", UserSchema)
export const Product = mongoose.model("Product", ProductSchema)
