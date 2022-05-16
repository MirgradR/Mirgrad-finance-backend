import Stock from '../models/Stocks/Stock'

class StockService {
    async getStocks(offset: number = 1, limit: number = 20, name = '') {
        return await Stock.find({"description": { $regex: new RegExp(name, 'ig') }}).skip(+offset).limit(+limit)
    }
}

export default new StockService()
