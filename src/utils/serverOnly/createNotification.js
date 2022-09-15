import { NOTIFICATION } from '@/src/enumerators'
import MongoDb from '@/src/mongoDb'

const createNotification = async (notification, user, to) => {
    await MongoDb.addNotification({
        from: user.name,
        message: notification,
        status: NOTIFICATION.STATUS_PENDING,
        to,
        type: NOTIFICATION.TYPE_NOTIFY
    })
}

export default createNotification