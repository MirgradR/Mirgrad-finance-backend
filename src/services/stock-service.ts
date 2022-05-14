import finnhubClient from '../finnhub/finhub-client'
import Stock from '../models/Stocks/Stock'

class StockService {
    async getStocks() {
        finnhubClient.stockSymbols("US", {'limit': 'n'}, async(error, data) => {
            if (error) {
                throw new Error('get stocks error: ' + error)
            }
            await Stock.deleteMany()
            await Stock.insertMany(data)
        });
        return await Stock.find()
    }
}

export default new StockService()
