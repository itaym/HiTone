import styles from './artist-profile.module.scss'
import getUserFromRequest from '@/utils/serverOnly/getUserFromRequest'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import MongoDb from '@/src/mongoDb'
// noinspection JSUnusedGlobalSymbols

export const getServerSideProps = async function ({ locale, req, params }) {


    const name = params.name

    return {
        props: {
            fallback: true,
            user: getUserFromRequest(req),
            artist: await MongoDb.getArtistProfile(name),
            ...await serverSideTranslations(locale, ['common', 'seo']),
        },
    }
}

const ArtistProfile = ({ user, artist, singles }) => {

    return (
        <div className={styles.main}>
            <h1 className={styles.name}> {artist.name}</h1>
            <div className={styles.imageAndDescription}>
                <div className={styles.imgBox}>
                    <img className={styles.artistImg} src={artist.image} alt="artist-img" />
                </div>
                <p className={styles.description}>{artist.description}</p>
            </div>
        </div>
    )
}
// noinspection JSUnusedGlobalSymbols
export default ArtistProfile
