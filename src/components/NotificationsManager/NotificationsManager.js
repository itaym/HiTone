import Conditional from '@/components/Conditional'
import ErrorElement from '@/components/ErrorElement'
import NOTIFICATION from '@/enumerators/NOTIFICATION'
import NotificationElement from '@/components/NotificationElement'
import TIME_UNITS from '@/enumerators/TIME_UNITS'
import styles from './NotificationsManager.module.scss'
import { getNotifications } from '@/redux/actions/root'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const NotificationsManager = () => {
    const dispatch = useDispatch()
    const errors = useSelector(({ errors }) => errors || [])
    const [handler, setHandler] = useState(0)
    const user = useSelector(({ users }) => users.user) || {}
    let notifications = useSelector(({ notifications }) => notifications || [])

    if (!user._id) {
        notifications = []
    }
    const array = [...errors, ...notifications].sort((a, b) => a.time - b.time)

    useEffect(() => {
        if (user._id) {
            if (handler) {
                clearTimeout(handler)
                let newHandler = setTimeout(() => {
                    dispatch(getNotifications())
                    setHandler(newHandler)
                }, TIME_UNITS.MINUTE * 3)
            } else {
                let newHandler = setTimeout(() => {
                    dispatch(getNotifications())
                    setHandler(newHandler)
                }, 0)
            }
        }
        return () => clearTimeout(handler)
    }, [dispatch, handler, user])
    return (
        <div className={styles.notificationsManager}>
            {array.map((element) =>
                <div key={element._id}>
                    <Conditional condition={element.type === NOTIFICATION.TYPE_ERROR}>
                        <ErrorElement error={element} />
                    </Conditional>
                    <Conditional condition={element.type === NOTIFICATION.TYPE_NOTIFY}>
                        <NotificationElement notification={element} />
                    </Conditional>
                </div>)}
        </div>
    )
}

export default NotificationsManager