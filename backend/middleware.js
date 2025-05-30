import { admin } from "./firebaseAdmin.js"

export class CustomError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  })
}

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
  const idToken = req.headers.authorization?.split("Bearer ")[1]

  if (!idToken) {
    return res.status(401).json({ user: null, message: "Unauthenticated" })
  }

  try {
    req.user = await admin.auth().verifyIdToken(idToken)
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ user: null, message: "Unauthenticated" })
  }
}
