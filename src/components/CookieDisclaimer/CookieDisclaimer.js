import classNames from 'classnames'
import styles from './CookieDisclaimer.module.scss'
import { getCookie ,setCookie } from 'react-use-cookie'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'

const APPROVED = 'true'
const COOKIE_NAME = 'APPROVE_COOKIES'

const CookieDisclaimer = () => {
    const { t } = useTranslation('common')
    const [cookieValue, setCookieValue] = useState(APPROVED)

    const setTheCookie = (value) => {
        setCookie(COOKIE_NAME, value , {
            days: 365,
            path: '/',
            SameSite: 'Strict',
            Secure: true,
        })
        setCookieValue(value)
    }
    const onClick = useCallback(() => {
        setCookie(COOKIE_NAME, APPROVED , {
            days: 365,
            path: '/',
            SameSite: 'Strict',
            Secure: true,
        })
        setTheCookie(APPROVED)
    }, [])
    useEffect(() => {
        const cookieValue = getCookie(COOKIE_NAME)
        setTheCookie(cookieValue)
    })
    return (
        <div className={classNames(styles.main, { hide: cookieValue === APPROVED})}>
            <span className={styles.message}>{t('components.CookieDisclaimer.message')}</span>
            <button
                className={styles.button}
                onClick={onClick}>{t('components.CookieDisclaimer.ok')}</button>
        </div>
    )
}
export default CookieDisclaimer