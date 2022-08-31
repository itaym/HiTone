import LanguageSelector from '@/components/LanguageSelector'
import Link from 'next/link'
import classNames from 'classnames'
import styles from '@/components/TopMenu/TopMenu.module.scss'
import { logout } from '@/src/redux/actions/users'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'

const TopMenu = () => {
    const { t } = useTranslation('common', { keyPrefix: 'components.TopMenu' })
    const user = useSelector(({ users }) => users.user) || {}
    const dispatch = useDispatch()

    return (
        <ul className={styles.menu}>
            <li className={styles.menuItem}>
                <Link  href="/">
                    <a><div className={styles.logo} /></a>
                </Link>
            </li>
            <li className={styles.menuItem}>
                <Link  href="/">
                    <a>{t('home')}</a>
                </Link>
            </li>
            <li className={styles.menuItem}>
                <Link  href="/">
                    <a>{t('about')}</a>
                </Link>
            </li>
            <li className={styles.menuItem}>
                <Link  href="/">
                    <a>{t('contact')}</a>
                </Link>
            </li>
            <li className={styles.menuItem}>
                {user._id ?
                    <a onClick={() => dispatch(logout())}>{t('logout')}</a> :
                    <Link href="/login">
                        <a>{t('login')}</a>
                    </Link>}
            </li>
            <li className={styles.menuItem}>
                {!user._id ?
                    <Link href="/registration">
                        <a><span className={styles.join}>{t('join')}</span></a>
                    </Link> : null}
            </li>
            <div className={classNames(styles.last)}>
                <span>
                    <LanguageSelector />
                </span>
                <span className={classNames("material-symbols-outlined")}>account_circle</span>
            </div>
        </ul>
    )
}

export default TopMenu