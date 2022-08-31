import { TIME_UNITS } from '@/src/enumerators'

function getCookieOptions(httpOnly = true) {
    const NOW = new Date().valueOf()

    return {
        expires: new Date(NOW + TIME_UNITS.YEAR),
        httpOnly: httpOnly,
        maxAge: TIME_UNITS.YEAR,
        path: "/",
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production",
    }
}

export default getCookieOptions