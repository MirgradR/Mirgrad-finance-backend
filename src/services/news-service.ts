import { News } from '../models/News'
import ApiError from '../exceptions/api-error'
import finnhubClient from '../finnhub/finhub-client'
import { currentTime } from '../helpers/currentTime'

class NewsService {
    async getNews(category: string = 'general', returnNews: (data: News[]) => void) {
        finnhubClient.marketNews(category, {}, (error: Error, data: News[]) => {
            if (error) {
                throw ApiError.BadRequest(error.message)
            }
            returnNews(data)
        })
    }
    async getNewsOfCompany(company: string, from = null, to = null, returnNewsOfCompany: (data: News[]) => void) {
        const fromDate = from || currentTime(1)
        const toDate = to || currentTime(0)
        finnhubClient.companyNews(company, fromDate, toDate, (error: Error, data: News[]) => {
            if (error) {
                throw ApiError.BadRequest(error.message)
            }
            returnNewsOfCompany(data)
        })
    }
}

export default new NewsService()
