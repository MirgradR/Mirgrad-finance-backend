import nodemailer from 'nodemailer'
import { API_URL, SMPT_PORT, SMPT_USER, SMTP_HOST, SMTP_PASSWORD } from '../constants/auth-constants'

class MailService {
    transporter: any
    constructor() {
        this.transporter = nodemailer.createTransport({
            //@ts-ignore
            host: SMTP_HOST,
            port: SMPT_PORT,
            secure: false,
            auth: {
                user: SMPT_USER,
                pass: SMTP_PASSWORD
            }
        })
    }
    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: SMPT_USER,
            to,
            subject: 'Activation ' + API_URL,
            html: 
            `
                <div>
                    <h1>Hello, for activation follow the link</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }
}

export default new MailService()
