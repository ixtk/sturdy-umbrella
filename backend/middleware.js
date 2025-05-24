import {admin} from "./firebaseAdmin.js"

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
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  console.log(idToken)
  if (!idToken) {
    return res.status(401).json({ user: null, message: "Unauthenticated" });
  }

  try {
    req.user = await admin.auth().verifyIdToken(idToken);
    console.log(req.user, 'asldfkja')
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ user: null, message: "Unauthenticated" });
  }
};
