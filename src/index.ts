import mongoose, { ConnectOptions } from 'mongoose'
import app from './app'
import { updateStocksDB } from './timer/update-db'
import { DB_URL, PORT } from './constants/auth-constants'

async function startApp() {
    try {
        await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true } as ConnectOptions)
        updateStocksDB()
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT', PORT))
    } catch (error) {
        console.log(error)
    }
}

startApp()
