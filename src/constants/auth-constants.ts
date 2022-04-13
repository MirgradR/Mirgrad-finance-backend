import dotenv from 'dotenv'
import configService from '../services/config-service'

dotenv.config()

enum SMPTConfig {
    SMTP_HOST = 'SMTP_HOST',
    SMPT_PORT = 'SMPT_PORT',
    SMPT_USER = 'SMPT_USER',
    SMTP_PASSWORD = 'SMTP_PASSWORD',
    API_URL = 'API_URL',
    CLIENT_URL = 'CLIENT_URL'
}

enum ServerConfigs {
    PORT = 'PORT',
    DB_URL = 'DB_URL'
}

enum Tokens {
    JWT_ACCESS_SECRET = 'JWT_ACCESS_SECRET',
    JWT_REFRESH_SECRET = 'JWT_REFRESH_SECRET'
}

export const SMTP_HOST = configService.getByKey(SMPTConfig.SMTP_HOST)
export const SMPT_PORT = configService.getByKey(SMPTConfig.SMPT_PORT)
export const SMPT_USER = configService.getByKey(SMPTConfig.SMPT_USER)
export const SMTP_PASSWORD = configService.getByKey(SMPTConfig.SMTP_PASSWORD)
export const API_URL = configService.getByKey(SMPTConfig.API_URL)
export const CLIENT_URL = configService.getByKey(SMPTConfig.CLIENT_URL)

export const DB_URL = configService.getByKey(ServerConfigs.DB_URL)
export const PORT = configService.getByKey(ServerConfigs.PORT)

export const JWT_ACCESS_SECRET = configService.getByKey(Tokens.JWT_ACCESS_SECRET)
export const JWT_REFRESH_SECRET = configService.getByKey(Tokens.JWT_REFRESH_SECRET)
