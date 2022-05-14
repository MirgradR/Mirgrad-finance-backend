import stockService from '../services/stock-service'

export interface Stock {
    description: string ,
    displaySymbol: string,
    symbol: string,
    type: string,
    mic: string,
    figi: string,
    shareClassFIGI: string,
    currency: string,
    symbol2: string,
    isin: string,
}

class StockController {
    async getStocks(req: any, res: any, next: any) {
        try {
            const stocks = await stockService.getStocks()
            return res.json(stocks)
        } catch (error) {
            next(error)
        }
    }
}

export default new StockController()
