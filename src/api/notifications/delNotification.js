import MongoDb from '@/src/mongoDb'
import httpStatus from 'http-status'
import responseJson from '@/utils/serverOnly/responseJson'

const delNotification = async (res, _id = '123456789101112131415161') => {
    let error
    let statusHttp = httpStatus.OK

    try {
        await MongoDb.delNotification(_id)
    }
    catch {
        error = 'errors.some_thing_went_wrong'
        statusHttp = httpStatus.INTERNAL_SERVER_ERROR
    }
    res.status(statusHttp).json(responseJson(statusHttp === httpStatus.OK, { }, statusHttp, error))
}

export default delNotification