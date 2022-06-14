import { Next } from './auth-controller'
import newsService from '../services/news-service'
import { paginateData } from '../helpers/paginator'
import { News } from '../models/News'

interface Request {
    query?: {
        offset: number,
        limit: number,
        name: string,
    },
    params?: {
        category: string
    }
}

interface ResponseGetNews {
    json: (arg0: News[]) => void
}

class NewsController {
    async getNews(req: Request, res: ResponseGetNews, next: Next) {
        try {
            const { category } = req.params;
            const { offset, limit } = req.query;
            const returnNews = (news: News[]) => {
                return res.json(paginateData(news, limit, offset))
            }
            await newsService.getNews(category, returnNews)  
        } catch (error) {
            next(error)
        }
    }
}

export default new NewsController()
