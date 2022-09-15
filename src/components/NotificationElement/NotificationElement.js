import TIME_UNITS from '@/enumerators/TIME_UNITS'
import classNames from 'classnames'
import propTypes from 'prop-types'
import styles from './NotificationElement.module.scss'
import { TypeNotification } from '@/src/propTypes'
import { clearNotification } from '@/redux/actions/root'
import { dateFromObjectId } from '@/src/utils'
import { format as formatDate } from 'date-fns'
import { sleep } from '@/src/utils'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'

const NotificationElement = (({ notification }) => {
    const { t } = useTranslation('common', { keyPrefix: 'components.NotificationElement' })
    const [minimize, setMinimize] = useState(false)
    const time = formatDate(dateFromObjectId(notification._id),
        t('date_time_format', { ns: 'common', keyPrefix: 'globals'}))
    const dispatch = useDispatch()

    const onClick = useCallback(async () => {
        setMinimize(true)
        await sleep(TIME_UNITS.SECOND)
        dispatch(clearNotification(notification))
    }, [dispatch, notification])

    return (
        <div className={classNames(styles.notificationHolder, { [styles.minimize]: minimize})}>
            <div className={classNames(styles.notificationElement, { [styles.minimize]: minimize})}>
                <div className={styles.date}>{time}</div>
                <div className={styles.text}>{t('from')}&nbsp;{notification.from}</div>
                <div className={styles.x} onClick={onClick}>X</div>
            </div>
            <div
                className={classNames(styles.notificationElement, { [styles.minimize]: minimize})}
                style={{borderTop: '1px solid  var(--border-color)'}}>
                <div className={styles.text}>{t(notification.message)}</div>
            </div>
        </div>
    )
})
NotificationElement.propTypes = {
    notification: propTypes.shape( TypeNotification ),
}

export default NotificationElement