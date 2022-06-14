import ApiError from '../exceptions/api-error'
import { MirgradFinance } from '../constants/my-company'
import finnhubClient from '../finnhub/finhub-client'
import Stock, { StockPrice, StockProfile } from '../models/Stocks/Stock'
import { paginateData } from '../helpers/paginator'

class StockService {
    async getStocks(offset: number = 1, limit: number = 20, name = '') {
        if (name !== '') {
            const stocks = await Stock.find({
                'description': { $regex: new RegExp(name, 'ig') }
            })
            return { stocks: paginateData(stocks, limit, offset), count: stocks.length }
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
                throw ApiError.BadRequest(error.message)
            }
            returnProfile(data)
        })
    }
    async getStockPrice(symbol: string, returnPrice: (data: StockPrice) => void) {
        if (symbol === 'MIRF') {
            symbol = 'FB'
        }
        finnhubClient.quote(symbol.toUpperCase(), (error: Error, data: StockPrice) => {
            if (error) {
                throw ApiError.BadRequest(error.message)
            }
            returnPrice(data)
        })
    }
}

export default new StockService()
