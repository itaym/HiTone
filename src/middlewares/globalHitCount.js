/* Count global number of hits to the system
*  */
import { getCookieOptions } from '@/src/utils'

let count = 0

export const globalHitCount = (req, res) => {
    const cookie = req.cookies['count']

    if (cookie) {
        const cookieCount = parseInt(cookie)
        count = Math.max(count, cookieCount)
    }
    res.cookie('count', ++count + '', getCookieOptions())

    console.log('Global Hit Count:', cookie || count)
}


