import Head from 'next/head'
import Seo from '@/src/seo/Seo'
import { useTranslation } from 'next-i18next'

const Header = () => {
    const { t } = useTranslation('seo')
    return (
        <Head>
            <title>{t('seo.title')}</title>
            <meta httpEquiv="content-language" content={t('globals.locale')} />
            <Seo t={t} />
        </Head>
    )
}

export default Header