import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import responseJson from '@/utils/responseJson'
import { TIME_UNITS } from '@/src/enumerators'
import { strCookie } from '@/src/utils'

const logout = (req, res) => {

    const token = jwt.sign(
        {},
        process.env.JWT_SECRET,
        {
            expiresIn: TIME_UNITS.YEAR * 120 / TIME_UNITS.SECOND,
        }
    )
    const cookieString = strCookie('auth', token, TIME_UNITS.YEAR * 120)

    res.setHeader('location', '/')
    res.setHeader('Set-Cookie', cookieString)
    res.status(httpStatus.OK).json(responseJson(true, {}, httpStatus.OK))
}
export default logout