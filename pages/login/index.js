import AutoForm from '@/components/AutoForm'
import getUserFromRequest from '@/utils/serverOnly/getUserFromRequest'
import styles from './login.module.scss'
import { useTranslation } from 'next-i18next'
import { login, logout } from '@/redux/actions/users'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { yupLoginSchema } from '@/src/yupSchemas'
import Link from 'next/link'

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps  = async function ({ locale, req }) {
    return {
        props: {
            fallback: true,
            user: getUserFromRequest(req),
            ...await serverSideTranslations(locale, ['common', 'seo']),
        },
    }
}

const Login = ({ user }) => {
    const { t } = useTranslation('common')
    const dispatch = useDispatch()

    const onSubmit = useCallback((values) => {
        dispatch((login(values)))
    }, [dispatch])

    useEffect(() => {
        if (user._id) {
            dispatch(logout(true))
        }
    }, [dispatch, user])
    return (
        <>
            <div className={styles.main}>

                <h1>{t('pages.login.title')}</h1>
                <h3>{t('pages.login.sub_title')}</h3>

                <div className={styles['hold-form']}>
                    <AutoForm
                        onSubmit={onSubmit}
                        schema={yupLoginSchema(t)}
                        submitText={t('pages.login.login_button')} />
                </div>
                <Link  href={'/reset-password'}>
                    <a><div className={styles.forgotPassword}>{t('pages.login.forgot_password')}</div></a>
                </Link>
            </div>
        </>
    )
}
// noinspection JSUnusedGlobalSymbols
export default Login
