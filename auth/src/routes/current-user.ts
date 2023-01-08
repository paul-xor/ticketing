import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.get('/api/users/currentuser', (req, res) => {
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }

  try {
    console.log('🔑 JWT_KEY: ', process.env.KEY_JWT);
    const payload = jwt.verify(
    req.session.jwt,
    process.env.KEY_JWT!
  )
  res.send({ currentUser: payload });
  } catch (error) {
    console.log('error: ', error);
    res.send({ currentUser: null });
  }
})

export { router as currentUserRouter }
