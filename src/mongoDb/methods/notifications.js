import NOTIFICATION from '@/enumerators/NOTIFICATION'
import { ObjectId } from 'mongodb'
import { dateFromObjectId } from '@/src/utils'

export const _addNotification = async function(notification) {
    await this._verifyConnection()

    await this._db.collection('notifications').insertOne(notification)
}

export const _delNotification = async function(_id) {
    await this._verifyConnection()

    const status = NOTIFICATION.STATUS_VIEWED
    await this._db.collection('notifications').updateOne({ _id: new ObjectId(_id) }, { $set: { status } })
    return true
}

export const _getNotifications = async function(to = 'HiTone', status = NOTIFICATION.STATUS_PENDING) {
    await this._verifyConnection()

    let notifications = await this._db.collection('notifications').find({ to, status }).toArray()
    notifications = [...notifications].map((element) => ({
        _id: element._id,
        from: element.from,
        message: element.message,
        time: dateFromObjectId(element._id.toString()).valueOf(),
        to: element.to,
        type: NOTIFICATION.TYPE_NOTIFY,
    }))
    return notifications
}
