import AutoForm from '@/components/AutoForm'
import Header from '@/src/components/Header'
import TopMenu from '@/components/TopMenu'
import getUserFromRequest from '@/utils/getUserFromRequest'
import styles from './login.module.scss'
import { clearError } from '@/redux/actions/root'
import { login, logout } from '@/redux/actions/users'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { yupLoginSchema } from '@/src/yupSchemas'

export const getServerSideProps  = async function ({ locale, req }) {
    return {
        props: {
            fallback: true,
            user: getUserFromRequest(req),
            ...await serverSideTranslations(locale, ['common', 'seo']),
        },
    }
}

let setTimeoutHandle;

const Login = ({ user }) => {
    const { t } = useTranslation('common')
    const dispatch = useDispatch()
    const error = useSelector(({ errors }) => errors[errors.length - 1])

    const onSubmit = useCallback((values) => {
        clearTimeout(setTimeoutHandle)
        if (error) {
            dispatch(clearError(error))
        }
        dispatch((login(values)))
    }, [dispatch, error])

    if (error) {
        setTimeoutHandle = setTimeout(() => dispatch(clearError(error)), 10_000)
    }
    useEffect(() => {
        if (user._id) {
            dispatch(logout(true))
        }
    }, [dispatch, user])

    return (
        <>
            <Header />
            <TopMenu />
            <div className={styles.main}>

                <h1>{t('pages.login.title')}</h1>
                <h3>{t('pages.login.sub-title')}</h3>

                <div className={styles['hold-form']}>
                    <AutoForm
                        onSubmit={onSubmit}
                        schema={yupLoginSchema(t)}
                        submitText={t('pages.login.login_button')} />
                    <div className={styles.loginError}>{t(error)}</div>
                </div>
            </div>
        </>
    )
}
export default Login



