import { Router } from 'express'
import { body } from 'express-validator'
import authMiddleware from '../middlewares/auth-middleware'
import AuthController from '../controllers/auth-controller'

//@ts-ignore
const authRouter = new Router()

authRouter.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 32 }),
    AuthController.registration
)
authRouter.post('/login', AuthController.login)
authRouter.post('/logout', AuthController.logout)
authRouter.get('/activate/:link', AuthController.activate)
authRouter.get('/refresh', AuthController.refresh)
authRouter.get('/users', authMiddleware, AuthController.getUsers)

export default authRouter
