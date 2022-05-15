import dotenv from 'dotenv'
import configService from '../services/config-service'
const finnhub = require('finnhub')

dotenv.config()

enum FinnhubConfigs {
    API_KEY_FINNHUB = 'API_KEY_FINNHUB'
}

export const API_KEY_FINNHUB = configService.getByKey(FinnhubConfigs.API_KEY_FINNHUB)

const api_key = finnhub.ApiClient.instance.authentications['api_key']

api_key.apiKey = API_KEY_FINNHUB

const finnhubClient = new finnhub.DefaultApi()

export default finnhubClient
