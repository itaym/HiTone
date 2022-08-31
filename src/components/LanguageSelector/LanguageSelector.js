import Cookies from 'js-cookie'
import classNames from 'classnames'
import styles from '@/components/LanguageSelector/LanguageSelector.module.scss'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

// const languages = ['de', 'en', 'es', 'fr', 'he', 'it', 'ja']
const languages = ['en', 'he',]

const TopMenu = () => {
    const { t } = useTranslation('common')
    const router = useRouter()
    const locale = t('globals.locale')

    const selectChange = async (e) => {
        const newLocale = e.target.value

        Cookies.set('LOCALE', newLocale, { expires: 365 * 10, sameSite: 'strict' })

        await router.push(
            router.pathname,
            router.asPath,
            { locale: newLocale, shallow: false });
    }
    return (
        <select onChange={selectChange} className={styles.select} value={locale}>
            <optgroup />
            {languages.map((language, index) =>
                <optgroup key={`optgroup_${index}`}>
                    <option
                        className={classNames({selected : language === locale})} value={language}>
                        {language}
                    </option>
                </optgroup>
            )}
            <optgroup />
        </select>
    )
}

export default TopMenu