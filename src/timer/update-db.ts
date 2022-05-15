import cron from 'node-cron'
import Stock from '../models/Stocks/Stock'
import finnhubClient from '../finnhub/finhub-client'

const updateStocks = () => {
    finnhubClient.stockSymbols("US", { 'limit': 'n' }, async (error, data) => {
        if (error) {
            throw new Error('get stocks error: ' + error)
        }
        await Stock.deleteMany()
        await Stock.insertMany(data)
        console.log('[-Update stocks is successfull-]')
    });
}

export const updateStocksDB = async() => {
    updateStocks()
    cron.schedule('0 1 * * *', () => {
        updateStocks()
        console.log('running a task every 24 hours');
    });
}
