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

app.post("/users/login", async (req, res) => {
  // superSecret -> $2b$10$WmxNDR4oVaWJOhJpWatmS.S2YViZ4Jqvr1W0RpgXlRIAp8lkrF0pG
  const { email, password } = req.body

  const existingUser = await User.findOne({ email: email })

  console.log(existingUser)

  if (existingUser !== null) {
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    )

    if (isPasswordCorrect) {
      return res.json(existingUser)
    }
  }

  res.status(401).json({
    message: "Invalid email or password"
  })
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
