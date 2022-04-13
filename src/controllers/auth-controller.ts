import { validationResult } from 'express-validator'
import ApiError from '../exceptions/api-error'
import authService from '../services/auth-service'
import { CLIENT_URL } from '../constants/auth-constants'

class AuthController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            
            const { email, password, userName } = req.body
            
            const userData = await authService.registration(email, password, userName)
           
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
    async login(req, res, next) {
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
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const token = await authService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (error) {
            next(error)
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await authService.activate(activationLink)

            return res.redirect(CLIENT_URL)
        } catch (error) {
            next(error)
        }
    }
    async refresh(req, res, next) {
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
    async getUsers(req, res, next) {
        try {
            const users = await authService.getUsersAll()

            return res.json(users)
        } catch (error) {
            next(error)
        }
    }
}

export default new AuthController()
