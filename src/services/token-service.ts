import jwt from 'jsonwebtoken'
import Token from '../models/Token'
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from './../constants/auth-constants'

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' })
        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({ user: userId })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await Token.create({ user: userId, refreshToken })
        return token
    }
    async removeToken(refreshToken) {
        const tokenData = await Token.deleteOne({ refreshToken })
        return tokenData
    }
    async findToken(refreshToken) {
        const tokenData = await Token.findOne({ refreshToken })
        return tokenData
    }
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, JWT_ACCESS_SECRET)
            return userData
        } catch (error) {
            return null
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, JWT_REFRESH_SECRET)
            return userData
        } catch (error) {
            return null
        }
    }
}

export default new TokenService()
