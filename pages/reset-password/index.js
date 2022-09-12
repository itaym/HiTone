import AutoForm from '@/components/AutoForm'
import fetchApi from '@/utils/fetchApi'
import getUserFromRequest from '@/src/utils/serverOnly/getUserFromRequest'
import styles from './reset-password.module.scss'
import { addError } from '@/redux/actions/root'
import { logout } from '@/redux/actions/users'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { yupResetPasswordSchema } from '@/src/yupSchemas'

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps = async function ({ locale, req }) {
    return {
        props: {
            fallback: true,
            user: getUserFromRequest(req),
            ...await serverSideTranslations(locale, ['common', 'seo']),
        },
    }
}

const ERROR = 'error'
const PENDING = 'pending'
const SUCCESS = 'success'

const ResetPassword = ({ user }) => {
    const [status, setStatus] = useState(PENDING)
    const dispatch = useDispatch()
    const { t } = useTranslation('common')

    const onSubmit = useCallback(async (values) => {
        const json = await fetchApi('/users/auth/resetPassword', { method: 'POST' }, values)

        if (json.ok) {
            setStatus(SUCCESS)
        }
        else {
            dispatch(addError(json.error))
        }
    }, [dispatch])

    useEffect(() => {
        if (user._id) {
            dispatch(logout(true))
        }
    }, [dispatch, user])

    const sections = useMemo(() => ({
        [ERROR]: [
            <h3 key={'error_h3'}>{t('pages.reset_password.sub_title_error')}</h3>,
            <h3 key={'error_p1'}>{t('pages.reset_password.error_explain_1')}</h3>,
            <h3 key={'error_p2'}>{t('pages.reset_password.error_explain_2')}</h3>,
        ],
        [PENDING]: [
            <h3 key={'pending_h3'}>{t('pages.reset_password.sub_title')}</h3>,
            <div key={'pending_div'} className={styles['hold-form']}>
                <AutoForm
                    onSubmit={onSubmit}
                    schema={yupResetPasswordSchema(t)}
                    submitText={t('pages.reset_password.reset_button')} />
            </div>],
        [SUCCESS]: [
            <h3 key={'success_h3'}>{t('pages.reset_password.sub_title_success')}</h3>,
            <h3 key={'success_p1'}>{t('pages.reset_password.success_explain_1')}</h3>,
            <h3 key={'success_p2'}>{t('pages.reset_password.success_explain_2')}</h3>,
        ]
    }), [onSubmit, t])
    return (
        <div className={styles.main}>
            <h1>{t('pages.reset_password.title')}</h1>
            {sections[status]}
        </div>
    )
}
// noinspection JSUnusedGlobalSymbols
export default ResetPassword
