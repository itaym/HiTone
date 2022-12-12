import AutoForm from '@/components/AutoForm'
import Link from 'next/link'
import getUserFromRequest from '@/utils/serverOnly/getUserFromRequest'
import { login, logout } from '@/redux/actions/users'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { yupLoginSchema } from '@/src/yupSchemas'
const styles = {}
// noinspection JSUnusedGlobalSymbols

export const getServerSideProps = async function ({ locale, req }) {
    return {
        props: {
            fallback: true,
            user: getUserFromRequest(req),
            artist: { name: "Tuna"},
            singles: [{}],
            ...await serverSideTranslations(locale, ['common', 'seo']),
        },
    }
}

const ArtistProfile = ({ user, artist, singles }) => {
    const { t } = useTranslation('common')
    const dispatch = useDispatch()

    useEffect(() => {

    }, [])
    return (
        <>
            <div className={styles.main}>

                <h1>{t('pages.artist_page.title', user)}</h1>

            </div>
        </>
    )
}
// noinspection JSUnusedGlobalSymbols
export default ArtistProfile
