import Stock from '../models/Stocks/Stock'

class StockService {
    async getStocks() {
        return await Stock.find()
    }
}

export default new StockService()
