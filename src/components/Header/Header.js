import Head from 'next/head'
import Seo from '@/src/seo/Seo'
import { useTranslation } from 'next-i18next'

const Header = () => {
    const { t: common_t } = useTranslation('common')
    const { t: seo_t } = useTranslation('seo')
    return (
        <Head>
            <title>{seo_t('seo.title')}</title>
            <meta httpEquiv="content-language" content={common_t('globals.locale')} />
            <Seo t={seo_t} />
        </Head>
    )
}

export default Header