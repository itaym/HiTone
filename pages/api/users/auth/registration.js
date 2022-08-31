import MongoDb from '@/src/mongoDb'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import responseJson from '@/utils/responseJson'
import strCookie from '@/utils/strCookie'
import { TIME_UNITS } from '@/src/enumerators'
import { sha512 } from '@/src/utils'

const cookieOptions = {
    httpOnly: true,
    maxAge: TIME_UNITS.YEAR * 120,
    path: "/",
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
}
const registration = async (req, res) => {
    let error = 'errors.user_cannot_be_created'
    let statusHttp = httpStatus.OK
    let token = ':('
    let user = {}

    try {
        if (req.method !== 'POST') {
            error = statusHttp = httpStatus.METHOD_NOT_ALLOWED
        }
        else {
            const email = req.body.email.toLowerCase()
            const password = req.body.password
            const data = req.body

            delete data.email
            delete data.password

            try {
                user = await MongoDb.addUser(email, password, data)
            }
            catch (e) {
                statusHttp = httpStatus.CONFLICT
            }
            if (statusHttp === httpStatus.OK) {
                error = undefined
                delete user.password
                await MongoDb.setLastLogin(email);
            }
            token = jwt.sign(
                { user },
                process.env.JWT_SECRET,
                {
                    expiresIn: Math.floor(cookieOptions.maxAge / TIME_UNITS.SECOND),
                }
            )
        }
    }
    catch (e) {
        error = statusHttp = httpStatus.INTERNAL_SERVER_ERROR
    }
    if (statusHttp === httpStatus.OK) {
        res.setHeader('location', '/')
    }
    const cookieString = strCookie('auth', token, cookieOptions.maxAge)
    res.setHeader('Set-Cookie', cookieString)
    res.status(statusHttp).json(responseJson(statusHttp === httpStatus.OK, { user }, statusHttp, error))
}
export default registration