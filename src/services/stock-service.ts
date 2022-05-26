import { MirgradFinance } from '../constants/my-company'
import finnhubClient from '../finnhub/finhub-client'
import Stock, { StockProfile } from '../models/Stocks/Stock'

class StockService {
    async getStocks(offset: number = 1, limit: number = 20, name = '') {
        if (name !== '') {
            offset = null
        }
        const count = await Stock.countDocuments()
        const stocks = await Stock.find({
            'description': { $regex: new RegExp(name, 'ig') }
        })
        .skip(+offset)
        .limit(+limit)

        return { stocks: stocks, count: count }
    }
    async getStockProfile(symbol: string, returnProfile: (data: StockProfile) => void) {
        if (symbol === 'MIRF') {
            return returnProfile(MirgradFinance.profile)
        }
        finnhubClient.companyProfile2({'symbol': symbol.toUpperCase()}, (error: Error, data: StockProfile) => {
            if (error) {
                throw new Error(error.message)
            }
            returnProfile(data)
        });
    }
}

export default new StockService()
