import { Router } from 'express'
import stockController from '../controllers/stock-controller'

//@ts-ignore
const stocksRouter = new Router()

stocksRouter.get('/stocks', stockController.getStocks)
stocksRouter.get('/stocks/:symbol/profile', stockController.getStockProfile)
stocksRouter.get('/stocks/:symbol/price', stockController.getStockPrice)

export default stocksRouter
