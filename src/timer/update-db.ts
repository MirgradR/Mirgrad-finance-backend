import cron from 'node-cron'
import Stock, { StockResponse } from '../models/Stocks/Stock'
import finnhubClient from '../finnhub/finhub-client'
import { simpleSort } from '../helpers/sort'
import { MirgradFinance } from '../constants/my-company'

const updateStocks = () => {
    finnhubClient.stockSymbols("US", { 'limit': 'n' }, async (error: Error, data: StockResponse[]) => {
        if (error) {
            throw new Error('get stocks error: ' + error)
        }
        await Stock.deleteMany()
        await Stock.insertMany(simpleSort([...data.filter(elem => elem.type === 'Common Stock'), MirgradFinance.stock], 'symbol') )
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
