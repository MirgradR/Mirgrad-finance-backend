import jwt from 'jsonwebtoken'
import Token from '../models/Token'
import authDto from '../dtos/auth-dto'
import { ResponseData } from './../controllers/auth-controller'
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from './../constants/auth-constants'

interface ResponseToken {
    user: ResponseData,
    refreshToken: string,
    save: () => void
}

export interface ValidateTokenData {
    email: string,
    id: string,
    userName: string,
    isActivated: boolean,
    iat: number,
    exp: number
}

class TokenService {
    generateTokens(payload: authDto) {
        const accessToken: string = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '30m' })
        const refreshToken: string = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' })
        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(userId: string, refreshToken: string) {
        const tokenData: ResponseToken = await Token.findOne({ user: userId })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await Token.create({ user: userId, refreshToken })
        return token
    }
    async removeToken(refreshToken: string) {
        const tokenData = await Token.deleteOne({ refreshToken })

        return tokenData
    }
    async findToken(refreshToken: string) {
        const tokenData = await Token.findOne({ refreshToken })
        return tokenData
    }
    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, JWT_ACCESS_SECRET)

            return userData
        } catch (error) {
            return null
        }
    }
    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, JWT_REFRESH_SECRET)

            return userData
        } catch (error) {
            return null
        }
    }
}

export default new TokenService()
