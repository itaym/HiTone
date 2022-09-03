import { TIME_UNITS } from '@/src/enumerators'

const strCookie = function(name, data, httpOnly = true) {
    const NOW = new Date().valueOf()
    return '' +
        `${name}=${data};` +
        `Expires=${new Date(NOW + TIME_UNITS.YEAR)};` +
        `httpOnly=${httpOnly};` +
        `maxAge=${TIME_UNITS.YEAR};` +
        `path=/;` +
        `sameSite=Strict;` +
        `secure=${process.env.NODE_ENV === "production"};`
}

export default strCookie