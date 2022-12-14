import AutoForm from '@/components/AutoForm'
import Conditional from '@/components/Conditional'
import getUserFromRequest from '@/utils/serverOnly/getUserFromRequest'
import styles from '../login/login.module.scss'
import { logout, registration } from '@/redux/actions/users'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { yupRegistrationSchema } from '@/src/yupSchemas'

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

const Registration = ({ user }) => {
    const { t } = useTranslation('common')
    const dispatch = useDispatch()
    const [showForm, setShowForm] = useState({ show: false })

    const onSubmit = useCallback((values) => {
        dispatch((registration(values)))
    }, [dispatch])

    const onResize = useCallback(() => setShowForm({ show: true }) , [])

    useEffect(() => {
        if (user._id) {
            dispatch(logout(true))
        }
        window.addEventListener('resize', onResize)
        setShowForm({ show: true })

        return () => window.removeEventListener('resize', onResize)
    }, [dispatch, onResize, user])

    return (
        <div className={styles.main}>
            <h1>{t('pages.registration.title')}</h1>
            <h3>{t('pages.registration.sub_title')}</h3>
            <Conditional condition={showForm.show}>
                <div className={styles['hold-form']}>
                    <AutoForm
                        onSubmit={onSubmit}
                        schema={yupRegistrationSchema(t)}
                        submitText={t('pages.registration.join_button')} />
                </div>
            </Conditional>
        </div>
    )
}
// noinspection JSUnusedGlobalSymbols
export default Registration
