import classNames from 'classnames'
import propTypes from 'prop-types'
import styles from './ErrorElement.module.scss'
import { clearError } from '@/redux/actions/root'
import { sleep } from '@/src/utils'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'

const ErrorElement = (({ error, timeout = 60_000 }) => {
    const dispatch = useDispatch()
    const [countDown, setCountDown] = useState(timeout / 1000)
    const [minimize, setMinimize] = useState(false)
    const { t } = useTranslation()

    const onClick = useCallback(() => setMinimize(true), [])

    useEffect(() => {
        if (countDown < 2) {
            setMinimize(true)
        }
        if (countDown > 0) {
            let time = 1000
            let value = 1
            if (countDown < 1) {
                time = countDown * 1000
                value = countDown
            }
            sleep(time).then(() => {
                setCountDown(countDown - value)
            })
        }
        else {
            dispatch(clearError(error))
        }
    }, [countDown])
    return (
        <div className={classNames(styles.errorElement, { [styles.minimize]: minimize})}>
            <div className={styles.text}>{t(error)}</div>
            <div className={styles.time}>{Math.floor(countDown)}s</div>
            <div className={styles.x} onClick={onClick}>X</div>
        </div>
    )
})
ErrorElement.propTypes = {
    error: propTypes.string.isRequired,
    timeout: propTypes.number,
}

export default ErrorElement