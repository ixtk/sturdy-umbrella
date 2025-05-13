import { User } from "./models.js"

export const validateSchema = schema => {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false })
      next()
    } catch (error) {
      return res.status(400).json({
        name: error.name,
        message: error.message,
        errors: error.errors
      })
    }
  }
}

export const verifyAuth = async (req, res, next) => {
  if (req.session.userId) {
    req.user = await User.findById(req.session.userId).select("-password")
    next()
  } else {
    return res.status(401).json({ user: null, message: "Unauthenticated" })
  }
}
