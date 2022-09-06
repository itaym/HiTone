import MongoDb from '@/src/mongoDb'
import httpStatus from 'http-status'
import responseJson from '@/utils/responseJson'

const verifyResetPassword = async (req, res) => {
    let statusHttp = httpStatus.OK
    let error

    if (req.method !== 'POST') {
        error = 'errors.method_not_allowed'
        statusHttp = httpStatus.METHOD_NOT_ALLOWED
    }
    else {
        const _id = req.body._id

        try {
            const result = await MongoDb.getResetPassword(_id)
            if (result) {
                const user = await MongoDb.getUser(result['name'])
                await MongoDb.updateUser(user['_id'], { password: result['password'] })
                await MongoDb.delResetPassword(result['_id'])
            }
            else {
                error = 'errors.verify_password_not_found'
                statusHttp = httpStatus.NOT_FOUND
            }
        }
        catch (e) {
            error = 'errors.some_thing_went_wrong'
            statusHttp = httpStatus.INTERNAL_SERVER_ERROR
        }
    }
    res.status(statusHttp).json(responseJson(statusHttp === httpStatus.OK, { }, statusHttp, error))
}

export default verifyResetPassword

