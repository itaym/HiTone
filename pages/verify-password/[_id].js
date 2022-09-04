import Header from '@/src/components/Header'
import Link from 'next/link'
import TopMenu from '@/components/TopMenu'
import fetchApi from '@/utils/fetchApi'
import httpStatus from 'http-status'
import styles from './verify-password.module.scss'
import { TIME_UNITS } from '@/enumerators/enumerators'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { setServerI18n_t_fn } from '@/src/utils'
import { sleep } from '@/src/utils'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps  = async function ({ locale, params: { _id } }) {
    return {
        props: {
            _id,
            fallback: true,
            ...await serverSideTranslations(locale, ['common', 'seo']),
        },
    }
}
const ERROR = 'error'
const FAILED = 'failed'
const PENDING = 'pending'
const VERIFIED = 'verified'

const VerifyPassword = ({ _id }) => {
    const { t } = useTranslation('common')
    const [status, setStatus] = useState(PENDING)
    const [error, setError] = useState('')
    setServerI18n_t_fn(t)

    useEffect(() => {
        (async (_id) => {
            await sleep(TIME_UNITS.SECOND * 4)
            return await fetchApi('/users/auth/verifyResetPassword', { method: 'POST' }, { _id })
        })(_id).then((result) => {
            if (!result.ok) {
                if (result.status === httpStatus.NOT_FOUND)
                    setStatus(FAILED)
                else
                    setStatus(ERROR)
                setError(result.error)
            }
            else {
                setStatus(VERIFIED)
            }
        })
    }, [_id])

    return (
        <>
            <Header />
            <TopMenu />
            <div className={styles.main}>

                <h1>{t('pages.verify_password.title')}</h1>
                <h3>{t(`pages.verify_password.sub_title_${status}`)}</h3>

                <div className={styles['hold-form']}>
                    <div className={styles.verifyError}>{t(error)}</div>
                </div>
                <Link  href={'/login'}>
                    <a><button className={styles.login}>{t('pages.verify_password.goto_login')}</button></a>
                </Link>
            </div>
        </>
    )
}
// noinspection JSUnusedGlobalSymbols
export default VerifyPassword
