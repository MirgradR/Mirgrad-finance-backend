import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user-router'

dotenv.config()

const app = express()

app.use(express.json())
app.use('/api', userRouter)


app.use((error: Error, res: any) => {
    console.error('[ERROR MIDDLEWARE]', error.message)
    res.status(500).send({ message: error.message })
})

export default app
