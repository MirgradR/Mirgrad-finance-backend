import ApiError from '../exceptions/api-error'
import { Next } from '../controllers/auth-controller'
import tokenService, { ValidateTokenData } from '../services/token-service'

interface Request {
    headers: {
        authorization: string
    },
    user: ValidateTokenData
}

export default function (req: Request, res: unknown, next: Next) {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError())
        }
        const accessToken = authorizationHeader.split(' ')[1]
        
        if(!accessToken) {
            return next(ApiError.UnauthorizedError())
        }
        const userData = tokenService.validateAccessToken(accessToken)

        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }
        req.user = userData as ValidateTokenData
        next()
    } catch (error) {
        return next(ApiError.UnauthorizedError())
    }
}
