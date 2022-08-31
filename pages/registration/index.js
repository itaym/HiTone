import AutoForm from '@/components/AutoForm'
import Header from '@/src/components/Header'
import TopMenu from '@/components/TopMenu'
import getUserFromRequest from '@/utils/getUserFromRequest'
import styles from '../login/login.module.scss'
import { clearError } from '@/redux/actions/root'
import { logout, registration } from '@/redux/actions/users'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { yupRegistrationSchema } from '@/src/yupSchemas'

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

const Registration = ({ user }) => {
    const { t } = useTranslation('common')
    const dispatch = useDispatch()
    const error = useSelector(({ errors }) => errors[errors.length - 1])

    const onSubmit = useCallback((values) => {
        clearTimeout(setTimeoutHandle)
        if (error) {
            dispatch(clearError(error))
        }
        dispatch((registration(values)))
    }, [dispatch, error])

    useEffect(() => {
        if (user._id) {
            dispatch(logout(true))
        }
        if (error) {
            clearTimeout(setTimeoutHandle)
            setTimeoutHandle = setTimeout(() => dispatch(clearError(error)), 10_000)
        }
    }, [dispatch, error, user])

    return (
        <>
            <Header />
            <TopMenu />
            <div className={styles.main}>

                <h1>{t('pages.registration.title')}</h1>
                <h3>{t('pages.registration.sub-title')}</h3>

                <div className={styles['hold-form']}>
                    <AutoForm
                        onSubmit={onSubmit}
                        schema={yupRegistrationSchema(t)}
                        submitText={t('pages.registration.join_button')} />
                    <div className={styles.loginError}>{t(error)}</div>
                </div>
            </div>
        </>
    )
}
export default Registration



