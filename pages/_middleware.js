import { NextResponse } from 'next/server'
import { globalHitCount, langRedirect, langCookie } from '@/src/middlewares'

// noinspection JSUnusedGlobalSymbols
export const middleware = (req) => {
    const res = NextResponse.next()

    globalHitCount(req, res)
    langCookie(req, res)

    let newResponse = langRedirect(req, res)
    if (newResponse) return newResponse

    return res
}
// noinspection JSUnusedGlobalSymbols
export const config = {
    matcher: '/:path*',
}
