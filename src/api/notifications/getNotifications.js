import MongoDb from '@/src/mongoDb'
import NOTIFICATION from '@/enumerators/NOTIFICATION'
import httpStatus from 'http-status'
import responseJson from '@/utils/serverOnly/responseJson'
import { dateFromObjectId } from '@/src/utils'

const getNotifications = async (res, user = { name: 'HiTone'}) => {
    let error
    let notifications = []
    let statusHttp = httpStatus.OK

    const email = user.name

    try {
        notifications = await MongoDb.getNotifications(email, NOTIFICATION.STATUS_PENDING)
        notifications = [...notifications].map(({ _id, from, to,}) =>({
            _id,
            from,
            time: dateFromObjectId(_id.toString()).valueOf(),
            to,
            type: NOTIFICATION.TYPE_NOTIFY

        }))
    }
    catch {
        error = 'errors.some_thing_went_wrong'
        statusHttp = httpStatus.INTERNAL_SERVER_ERROR
    }
    res.status(statusHttp).json(responseJson(statusHttp === httpStatus.OK, { notifications }, statusHttp, error))
}

export default getNotifications