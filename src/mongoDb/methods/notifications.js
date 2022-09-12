import NOTIFICATION from '@/enumerators/NOTIFICATION'
import { ObjectId } from 'mongodb'

export const _addNotification = async function(notification) {
    await this._verifyConnection()
    await this._db.collection('notifications').insertOne(notification)
}
// noinspection JSUnusedGlobalSymbols
export const _delNotification = async function(_id) {
    await this._verifyConnection()
    const status = NOTIFICATION.STATUS_VIEWED
    await this._db.collection('notifications').updateOne({ _id: new ObjectId(_id) }, { $set: { status } })
    return true
}
// noinspection JSUnusedGlobalSymbols
export const _getNotifications = async function(to, status = NOTIFICATION.STATUS_PENDING) {
    await this._verifyConnection()
    let notifications = await this._db.collection('notifications').find({ to, status }).toArray()
    notifications = [...notifications].map((element) =>({
        _id: element._id,
        from: element.from,
        to: element.to,
        message: element.message,
    }))
    return notifications
}
