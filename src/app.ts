import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth-router'
import stocksRouter from './routes/stocks-router'
import errorMiddleware from './middlewares/error-middleware'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use('/api', authRouter)
app.use('/api', stocksRouter)
app.use(errorMiddleware)

app.use((error: Error, res: any) => {
    console.error('[ERROR MIDDLEWARE]', error.message)
    res.status(500).send({ message: error.message })
})

export default app
