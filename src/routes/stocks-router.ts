import { Router } from 'express'
import stockController from '../controllers/stock-controller'

//@ts-ignore
const stocksRouter = new Router()

stocksRouter.get('/stocks', stockController.getStocks)
stocksRouter.get('/stocks/:symbol/profile', stockController.getStockProfile)

export default stocksRouter
