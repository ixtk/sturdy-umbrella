import { User } from "../models.js"

export const socialAuth = async (req, res) => {
  const existingUser = await User.findOne({ providerUserId: req.user.user_id })

  if (existingUser) {
    return res.status(200).json({message: "OK", existingUser: true})
  }

  await User.create({ providerUserId: req.user.user_id })

  return res.status(200).json({message: "OK", existingUser: false})
}

export const getSecretMsg = (req, res) => {
  res.json({ secret: "2 x 2 = 4" })
}
