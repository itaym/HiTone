import MongoDb from '@/src/mongoDb'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import responseJson from '@/utils/serverOnly/responseJson'
import strCookie from '@/utils/strCookie'
import { TIME_UNITS } from '@/src/enumerators'
import { getCookieOptions } from '@/src/utils'
import { sha512 } from '@/utils/serverOnly'

const login = async (req, res) => {
    let error = 'errors.user_was_not_found'
    let statusHttp = httpStatus.OK
    let token = ':('
    let user = {}

    if (req.method !== 'POST') {
        error = statusHttp = httpStatus.METHOD_NOT_ALLOWED
    }
    else {
        const email = req.body.email.toLowerCase()
        const password = req.body.password
        try {
            user = await MongoDb.getUser(email)
            if (!user) {
                statusHttp = httpStatus.NOT_FOUND
            }
            else {
                const reCreateHash = sha512( password, user.password.salt)

                if (user.password.hash !== reCreateHash.hash) {
                    statusHttp = httpStatus.NOT_FOUND
                    user = {}
                }
            }
        }
        catch {
            statusHttp = httpStatus.INTERNAL_SERVER_ERROR
            error = 'errors.some_thing_went_wrong'
        }
        try {
            if (statusHttp === httpStatus.OK) {
                error = undefined
                delete user.password
                await MongoDb.setLastLogin(email)
            }
            token = jwt.sign(
                { user },
                process.env.JWT_SECRET, {
                    expiresIn: Math.floor(getCookieOptions().maxAge / TIME_UNITS.SECOND),
                }
            )
        }
        catch (e) {
            error = statusHttp = httpStatus.INTERNAL_SERVER_ERROR
        }
    }
    if (statusHttp === httpStatus.OK) {
        res.setHeader('location', '/')
    }
    const cookieString = strCookie('auth', token)
    res.setHeader('Set-Cookie', cookieString)
    res.status(statusHttp).json(responseJson(statusHttp === httpStatus.OK, { user }, statusHttp, error))
}
// noinspection JSUnusedGlobalSymbols
export default login
