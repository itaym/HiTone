import AutoForm from '@/components/AutoForm'
import Link from 'next/link'
import styles from './artist-profile.module.scss'
import getUserFromRequest from '@/utils/serverOnly/getUserFromRequest'
import { login, logout } from '@/redux/actions/users'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ArtistHeader from '@/components/ArtistHeader'
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { yupLoginSchema } from '@/src/yupSchemas'
// noinspection JSUnusedGlobalSymbols

export const getServerSideProps = async function ({ locale, req }) {
    return {
        props: {
            fallback: true,
            user: getUserFromRequest(req),
            artist: { name: "Itay Merchav" },
            singles: [{ name: "Tel-Aviv: Tmunat Matzav" }],
            description: "While many bands sing of ideal romance unimaginable to the average Joe, Prentzip’s new single “Shir Pop” (Pop Song) does just the opposite. It embraces that average Joe in his everyday frustrations as he falls for a girl who just can’t seem to reciprocate. Instead of chasing after her time and time again with grand gestures and heartfelt love songs, all he can manage is an aromantic pop song. We asked Haim Kalvo, lead singer and songwriter of Prentzip, some questions about the band and the new single",
            ...await serverSideTranslations(locale, ['common', 'seo']),
        },
    }
}

const ArtistProfile = ({ user, artist, singles, description }) => {
    const { t } = useTranslation('common')
    const dispatch = useDispatch()

    useEffect(() => {

    }, [])
    return (
        <>
            <div className={styles.container}>
                <ArtistHeader />
                <div className={styles.main}>
                    <h1 className={styles.name}> {artist.name}</h1>
                    <div className={styles.imageAndDescription}>
                        <div className={styles.imgBox}>
                            <img className={styles.artistImg} src="/images/itay-img.png" alt="artist-img" />
                        </div>
                        <p className={styles.description}>{description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
// noinspection JSUnusedGlobalSymbols
export default ArtistProfile
