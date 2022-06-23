import { Router } from 'express'
import newsController from '../controllers/news-controller'

//@ts-ignore
const newsRouter = new Router()

newsRouter.get('/news/:category', newsController.getNews)
newsRouter.get('/newsOfCompany/:company', newsController.getNewsOfCompany)

export default newsRouter
