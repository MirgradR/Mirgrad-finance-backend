import ApiError from '../exceptions/api-error'
import finnhubClient from '../finnhub/finhub-client'

class NewsService {
    async getNews(category: string = 'general', returnNews: (data) => void) {
        finnhubClient.marketNews(category, {}, (error: Error, data) => {
            if (error) {
                throw ApiError.BadRequest(error.message)
            }
            returnNews(data)
        })
    }
}

export default new NewsService()
