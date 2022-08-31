/* Count global number of hits to the system
*  */
import { TIME_UNITS } from '../enumerators';

const cookieOptions = {
    httpOnly: true,
    maxAge: TIME_UNITS.YEAR * 120,
    path: "/",
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
}
let count = 0

export const globalHitCount = (req, res) => {
    const cookie = req.cookies['count']

    if (cookie) {
        const cookieCount = parseInt(cookie)
        count = Math.max(count, cookieCount)
    }
    res.cookie('count', ++count + '', cookieOptions)

    console.log('Global Hit Count:', cookie || count)
}


