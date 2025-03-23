import express from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String
  },
  { timestamps: true }
)

export const User = mongoose.model("User", userSchema)

const app = express()

app.use(express.json())

app.post("/users/register", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body

  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username: username,
    email,
    password: hashedPassword
  })

  await newUser.save()

  res.status(201).json(newUser)
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
