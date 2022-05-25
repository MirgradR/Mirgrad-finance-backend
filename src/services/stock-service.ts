import Stock from '../models/Stocks/Stock'

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
}

export default new StockService()
