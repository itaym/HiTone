import config from '../../next-i18next.config'
import { NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

const countryLanguageMap = {
    be: 'fr',
    ca: 'en',
    fr: 'fr',
    gb: 'en',
    il: 'he',
    us: 'en',
}

const languages = config['i18n']['locales']

export const langRedirect = (req) => {
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

    if (req.nextUrl.locale !== language) {
        return NextResponse.redirect(new URL(`/${language}${req.nextUrl.pathname}`, req.url))
    }
}