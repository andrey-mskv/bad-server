import { errors } from 'celebrate'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express, { json, urlencoded } from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { DB_ADDRESS } from './config'
import errorHandler from './middlewares/error-handler'
import serveStatic from './middlewares/serverStatic'
import routes from './routes'
import helmet, { contentSecurityPolicy } from 'helmet'

const { PORT = 3000 } = process.env
const ORIGIN_ALLOW = process.env.ORIGIN_ALLOW
const app = express()

// helmet(CSP) - от XSS атак
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        imgSrc: ["'self'", 'data:'],
      },
    },
  })
)

app.use(cors({ origin: ORIGIN_ALLOW, credentials: true }));

app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')));

app.use(urlencoded({ extended: true }))
app.use(json())

app.options('*', cors())
app.use(routes)
app.use(errors())
app.use(errorHandler)

// eslint-disable-next-line no-console

const bootstrap = async () => {
    try {
        await mongoose.connect(DB_ADDRESS)
        await app.listen(PORT, () => console.log('ok'))
    } catch (error) {
        console.error(error)
    }
}

bootstrap()
