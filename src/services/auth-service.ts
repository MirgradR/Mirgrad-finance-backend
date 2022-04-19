import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import User from '../models/User'
import AuthDto from '../dtos/auth-dto'
import MailService from './mail-service'
import ApiError from '../exceptions/api-error'
import { API_URL } from '../constants/auth-constants'
import { ResponseData } from '../controllers/auth-controller'
import TokenService, { ValidateTokenData } from './token-service'

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

interface FindToken {
    _id: string,
    user: string,
    refreshToken: string,
    __v: number
}

class AuthService {
    async registration(email: string, password: string, userName: string) {

        const candidateEmail: ResponseData = await User.findOne({ email })
        const candidateUserName: ResponseData = await User.findOne({ userName })

        if (candidateUserName) {
            throw ApiError.BadRequest(`The User with userName ${userName} exists`)
        }
        if (candidateEmail) {
            throw ApiError.BadRequest(`The User with email ${email} exists`)
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = v4()

        const user: ResponseData = await User.create({ email, userName, activationLink, password: hashPassword })
        await MailService.sendActivationMail(email, `${API_URL}/api/activate/${activationLink}`)

        const userDto = new AuthDto(user)
        const tokens = TokenService.generateTokens({ ...userDto })
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }         
    }
    async activate(activationLink: (url: string) => string) {
        const user: ResponseData = await User.findOne({ activationLink })
        if (!user) {
            throw ApiError.BadRequest('Not correct link')
        }
        user.isActivated = true
        await user.save()
    }
    async login(email: string, password: string) {
        const user: ResponseData = await User.findOne({ email })
        
        if (!user) {
            throw ApiError.BadRequest('User is not found')
        }
        const isPasswordEquals = await bcrypt.compare(password, user.password)
        
        if (!isPasswordEquals) {
            throw ApiError.BadRequest('Password is not correct')
        }
        const userDto = new AuthDto(user)
       
        const tokens = TokenService.generateTokens({ ...userDto })
        
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }         
    }
    async logout(refreshToken: string) {
        const token = await TokenService.removeToken(refreshToken)
        return token
    }
    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = await TokenService.validateRefreshToken(refreshToken)
        const tokenFromDB: FindToken = await TokenService.findToken(refreshToken)

        if (!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError()
        }
        const user: ResponseData = await User.findById((userData as ValidateTokenData).id )
        const userDto = new AuthDto(user)
       
        const tokens = TokenService.generateTokens({ ...userDto })
        
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }
    async getUsersAll() {
        const users: ResponseData[] = await User.find()
        return users
    }

}

export default new AuthService()
