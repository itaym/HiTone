import * as path from 'path'
import MongoDb from '@/src/mongoDb'
import httpStatus from 'http-status'
import responseJson from '@/utils/serverOnly/responseJson'
import { EmailTemplates } from '@/src/emailTemplates'
import { HTML_TEMPLATES } from '@/src/enumerators'
import { SMTPClient, Message } from 'emailjs'
import { stringToLiteralWithData } from '@/src/utils'

const resetPassword = async (req, res) => {
    // noinspection JSUnresolvedVariable
    const t = process.t[req.cookies['LOCALE']]
    let statusHttp = httpStatus.OK
    let error

    if (req.method !== 'POST') {
        error = 'errors.method_not_allowed'
        statusHttp = httpStatus.METHOD_NOT_ALLOWED
    }
    else {
        const email = req.body.email.toLowerCase()
        const password = req.body.password

        try {
            const objectId = (await MongoDb.addResetPassword(email, password))._id + ''
            const user = await MongoDb.getUserWithDetails(email)
            const emailUserName = t('emails.email_name_format', user['details'])

            let emailHTML = await EmailTemplates(HTML_TEMPLATES.RESET_PASSWORD)
            emailHTML = stringToLiteralWithData(emailHTML, {
                emailUserName,
                objectId
            }, t)
            const message = new Message({
                text: `goto: ${process.env.SERVER_ADDRESS}/verify-password/${objectId}`,
                from: `HiTone <${process.env.MAIL_ADDR_RESET_PASSWORD}>`,
                to: `${emailUserName} <${email}>`,
                subject: t('emails.reset_password_subject'),
                attachment: [
                    {
                        data: emailHTML,
                        alternative: true,
                        headers: { 'Content-ID': 'html-body' }
                    },
                    {
                        path: path.join(process.cwd(), '/public/images/email-logo.png'),
                        type: 'image/png',
                        headers: { 'Content-ID': '<email-logo>' },
                    }
                ],
            })
            const client = new SMTPClient({
                user: process.env.MAIL_SMTP_USERNAME,
                password: process.env.MAIL_SMTP_PASSWORD,
                host: process.env.MAIL_SMTP_ADDRESS,
                port: process.env.MAIL_SMTP_PORT,
                ssl: true,
            })
            try {
                await client.sendAsync(message);
            } catch (e) {
                statusHttp = httpStatus.INTERNAL_SERVER_ERROR
                error = 'errors.some_thing_went_wrong'
            }
        }
        catch { /* Don't report any error when resetting passwords */ }
    }
    res.status(statusHttp).json(responseJson(statusHttp === httpStatus.OK, { }, statusHttp, error))
}

// noinspection JSUnusedGlobalSymbols
export default resetPassword
