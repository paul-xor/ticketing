import express, { json } from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/singin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()
app.set('trust proxy', true)
mongoose.set('strictQuery', true);
app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
)

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', async() => {
  throw new NotFoundError()
})

app.use(errorHandler)

const start = async() => {
  if(!process.env.JWT_KEY) {
    throw new Error('JWT must be defined')
  }
  try {
    // auth database should be created automatically
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('🤝 Connected to MongoDB')
  } catch (error) {
    console.log(error)
  }
  app.listen(3000, () => {
  console.log('🚀 Listen on PORT: 3000')
  })
}

start()