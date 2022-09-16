import MongoDb from '@/src/mongoDb'
import httpStatus from 'http-status'
import responseJson from '@/utils/serverOnly/responseJson'

const getNotifications = async (res, user = { name: 'HiTone'}, status) => {
    let error
    let notifications = []
    let statusHttp = httpStatus.OK

    const email = user.name

    try {
        notifications = await MongoDb.getNotifications(email, status)
    }
    catch {
        error = 'errors.some_thing_went_wrong'
        statusHttp = httpStatus.INTERNAL_SERVER_ERROR
    }
    res.status(statusHttp).json(responseJson(statusHttp === httpStatus.OK, { notifications }, statusHttp, error))
}

export default getNotifications