import { User } from "../models.js"

export const socialAuth = async (req, res) => {
  const existingUser = await User.findOne({ providerUserId: req.user.user_id })

  if (existingUser) {
    return res.status(200).json({message: "OK"})
  }

  await User.create({ providerUserId })

  return res.status(200).json({message: "OK"})
}

export const getSecretMsg = (req, res) => {
  res.json({ secret: "2 x 2 = 4" })
}
