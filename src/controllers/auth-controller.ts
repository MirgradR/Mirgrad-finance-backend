import { validationResult } from 'express-validator'
import { DeleteResult } from 'mongodb'
import authDto from '../dtos/auth-dto'
import ApiError from '../exceptions/api-error'
import authService from '../services/auth-service'
import { CLIENT_URL } from '../constants/auth-constants'

interface UserData {
    user: authDto,
    accessToken: string,
    refreshToken: string,
}

export interface ResponseData {
    isActivated: boolean,
    _id: string,
    userName: string,
    email: string,
    password: string,
    __v: number,
    save?: () => void
}

export type Next = (arg0?: ApiError) => void

interface ResponseAuth {
    cookie: (arg0: string, arg1: string, arg2: {
        maxAge: number,
        secure: boolean,
        httpOnly: boolean 
    }) => void,
    json: (arg0: {
        user: authDto,
        accessToken: string,
        refreshToken: string 
    }) => void 
}

interface Request {
    body: {
        email: string,
        password: string,
        userName?: string
    },
    cookies: {
        refreshToken: string
    },
    params: string
}

interface ResponseOther<T> {
    clearCookie: (arg0: string) => void,
    json: (arg0: T) => void,
    redirect: (arg0: string) => void,
}

class AuthController {
    async registration(req: Pick<Request, 'body'>, res: ResponseAuth, next: Next) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            
            const { email, password, userName } = req.body
            
            const userData: UserData = await authService.registration(email, password, userName)
           
            res.cookie('refreshToken', userData?.refreshToken, { 
                maxAge: 30*24*60*60*1000,
                secure: true,
                httpOnly: true
            })
            
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
    async login(req: Pick<Request, 'body'>, res: ResponseAuth, next: Next) {
        try {
            const { email, password } = req.body
            
            const userData = await authService.login(email, password)

            res.cookie('refreshToken', userData?.refreshToken, { 
                maxAge: 30*24*60*60*1000,
                secure: true,
                httpOnly: true
            })

            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
    async logout(req: Pick<Request, 'cookies'>, res: Omit<ResponseOther<DeleteResult>, 'redirect'>, next: Next) {
        try {
            const { refreshToken } = req.cookies
            const token = await authService.logout(refreshToken)

            res.clearCookie('refreshToken')

            return res.json(token)
        } catch (error) {
            next(error)
        }
    }
    async activate(req: Pick<Request, 'params'>, res: Pick<ResponseOther<ResponseData[]>, 'redirect'>, next: Next) {
        try {
            const activationLink = req.params.link

            await authService.activate(activationLink)

            return res.redirect(CLIENT_URL)
        } catch (error) {
            next(error)
        }
    }
    async refresh(req: Pick<Request, 'cookies'>, res: ResponseAuth, next: Next) {
        try {
            const { refreshToken } = req.cookies

            const userData = await authService.refresh(refreshToken)

            res.cookie('refreshToken', userData?.refreshToken, { 
                maxAge: 30*24*60*60*1000,
                secure: true,
                httpOnly: true
            })

            return res.json(userData) 
        } catch (error) {
            next(error)
        }
    }
    async getUsers(req: unknown, res: Pick<ResponseOther<ResponseData[]>, 'json'>, next: Next) {
        try {
            const users: ResponseData[] = await authService.getUsersAll()

            return res.json(users)
        } catch (error) {
            next(error)
        }
    }
}

export default new AuthController()
