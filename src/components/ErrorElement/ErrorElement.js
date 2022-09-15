import TIME_UNITS from '@/enumerators/TIME_UNITS'
import classNames from 'classnames'
import propTypes from 'prop-types'
import styles from './ErrorElement.module.scss'
import { TypeNotification } from '@/src/propTypes'
import { clearError } from '@/redux/actions/root'
import { format as formatDate } from 'date-fns'
import { sleep } from '@/src/utils'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'

const ErrorElement = (({ error, timeout = 60_000 }) => {
    const { t } = useTranslation()
    const [countDown, setCountDown] = useState(timeout / 1000)
    const [minimize, setMinimize] = useState(false)
    const time = formatDate(new Date(error.time), t('globals.time_format'))
    const dispatch = useDispatch()

    const onClick = useCallback(() => setMinimize(true), [])

    useEffect(() => {
        if (countDown < 2) {
            setMinimize(true)
        }
        if (countDown > 0) {
            let time = TIME_UNITS.SECOND
            let value = 1
            if (countDown < 1) {
                time = countDown * TIME_UNITS.SECOND
                value = countDown
            }
            sleep(time).then(() => {
                setCountDown(countDown - value)
            })
        }
        else {
            dispatch(clearError(error))
        }
    }, [countDown, dispatch, error])
    return (
        <div className={classNames(styles.errorElement, { [styles.minimize]: minimize})}>
            <div className={styles.date}>{time}</div>
            <div className={styles.text}>{t(error.message)}</div>
            <div className={styles.time}>{Math.floor(countDown)}s</div>
            <div className={styles.x} onClick={onClick}>X</div>
        </div>
    )
})
ErrorElement.propTypes = {
    error: propTypes.shape( TypeNotification ),
    timeout: propTypes.number,
}

export default ErrorElement