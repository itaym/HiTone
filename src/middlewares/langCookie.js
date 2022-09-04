import config from '../../next-i18next.config'
import { getCookieOptions } from '@/src/utils'

const PUBLIC_FILE = /\.(.*)$/

//todo: create a full map
const countryLanguageMap = {
    be: 'fr',
    ca: 'en',
    fr: 'fr',
    gb: 'en',
    il: 'he',
    us: 'en',
}

const languages = config['i18n']['locales']

export const langCookie = (req, res) => {
    if (
        req.nextUrl.pathname.startsWith('/_next') ||
        req.nextUrl.pathname.includes('/api/') ||
        PUBLIC_FILE.test(req.nextUrl.pathname)
    ) {
        return
    }
    const country = req.geo?.country?.toLowerCase() || 'il'
    let language = req.cookies['LOCALE'] || countryLanguageMap[country]

    if (!languages.includes(language)) language = 'en'

    if (req.nextUrl.locale !== language || !req.cookies['LOCALE']) {
            res.cookie('LOCALE', language, getCookieOptions(false))
    }
}
