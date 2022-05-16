import { Next } from './auth-controller'
import stockService from '../services/stock-service'

interface ResponseStocks {
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
}
interface Request {
    query: {
        offset: number,
        limit: number,
        name: string,
    }
}
interface Response {
    json: (arg0: ResponseStocks[]) => void
}

class StockController {
    async getStocks(req: Request, res: Response, next: Next) {
        try {
            const { offset, limit, name } = req.query;
            const stocks: ResponseStocks[] = await stockService.getStocks(offset, limit, name)
            return res.json(stocks)
        } catch (error) {
            next(error)
        }
    }
}

export default new StockController()
