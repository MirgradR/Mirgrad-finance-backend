import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import User from '../models/User'
import AuthDto from '../dtos/auth-dto'
import MailService from './mail-service'
import TokenService from './token-service'
import ApiError from '../exceptions/api-error'
import { API_URL } from '../constants/auth-constants'

class AuthService {
    async registration(email, password, userName) {

        const candidateEmail = await User.findOne({ email })
        const candidateUserName = await User.findOne({ userName })

        if (candidateUserName) {
            throw ApiError.BadRequest(`The User with userName ${userName} exists`)
        }
        if (candidateEmail) {
            throw ApiError.BadRequest(`The User with email ${email} exists`)
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = v4()

        const user = await User.create({ email, userName, activationLink, password: hashPassword })
        await MailService.sendActivationMail(email, `${API_URL}/api/activate/${activationLink}`)

        const userDto = new AuthDto(user)
        const tokens = TokenService.generateTokens({ ...userDto })
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }         
    }
    async activate(activationLink) {
        const user = await User.findOne({ activationLink })
        if (!user) {
            throw ApiError.BadRequest('Not correct link')
        }
        user.isActivated = true
        await user.save()
    }
    async login(email, password) {
        const user = await User.findOne({ email })
        
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
    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken)
        return token
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = await TokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await TokenService.findToken(refreshToken)
        if (!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError()
        }
        const user = await User.findById(userData.id)
        const userDto = new AuthDto(user)
       
        const tokens = TokenService.generateTokens({ ...userDto })
        
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }
    async getUsersAll() {
        const users = await User.find()
        return users
    }

}

export default new AuthService()
