import { Next } from './auth-controller'
import stockService from '../services/stock-service'
import { StockPrice, StockProfile } from '../models/Stocks/Stock'

interface ResponseStocks {
    stocks: {
        _id: string,
        description: string,
        displaySymbol: string,
        symbol: string,
        type: string,
        mic: string,
        figi: string,
        shareClassFIGI: string,
        currency: string,
        symbol2: string,
        isin: string | null,
        __v: number
    }[],
    count: number
}

interface Request {
    query?: {
        offset: number,
        limit: number,
        name: string,
    },
    params?: {
        symbol: string
    }
}
interface ResponseGetStocks {
    json: (arg0: ResponseStocks[]) => void
}
interface ResponseGetStockProfile {
    json: (arg0: StockProfile) => void
}
interface ResponseGetStockPrice {
    json: (arg0: StockPrice) => void
}

class StockController {
    async getStocks(req: Request, res: ResponseGetStocks, next: Next) {
        try {
            const { offset, limit, name } = req.query;
            const stocks: ResponseStocks = await stockService.getStocks(offset, limit, name)
            //@ts-ignore
            return res.json(stocks)
        } catch (error) {
            next(error)
        }
    }
    async getStockProfile(req: Request, res: ResponseGetStockProfile, next: Next) {
        try {
            const { symbol } = req.params;
            const returnProfile = (profile: StockProfile) => {
                return res.json(profile)
            }
            await stockService.getStockProfile(symbol, returnProfile)  
        } catch (error) {
            next(error)
        }
    }
    async getStockPrice(req: Request, res: ResponseGetStockPrice, next: Next) {
        try {
            const { symbol } = req.params;
            const returnPrice = (price: StockPrice) => {
                return res.json(price)
            }
            await stockService.getStockPrice(symbol, returnPrice)  
        } catch (error) {
            next(error)
        }
    }
}

export default new StockController()
