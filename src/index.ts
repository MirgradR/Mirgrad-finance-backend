import mongoose, { ConnectOptions } from 'mongoose'
import dotenv from 'dotenv'
import app from './app'
import configService from './services/config-service'

dotenv.config()

enum ServerCongigs {
    PORT = 'PORT',
    DB_URL = 'DB_URL'
}

const DB_URL = configService.getByKey(ServerCongigs.DB_URL)
const PORT = configService.getByKey(ServerCongigs.PORT)

async function startApp() {
    try {
        await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true } as ConnectOptions)
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT', PORT))
    } catch (error) {
        console.log(error)
    }
}

startApp()
