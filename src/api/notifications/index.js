import delNotification from '@/src/api/notifications/delNotification'
import getNotifications from '@/src/api/notifications/getNotifications'
import httpStatus from 'http-status'
import responseJson from '@/utils/serverOnly/responseJson'
import { addUserToApi } from '@/src/utils/serverOnly'

const notifications = async (req, res, user) => {
    switch (req.method) {
        case 'DELETE':
            await delNotification(res, req.body._id)
            break
        case 'GET':
            await getNotifications(res, user)
            break
        default:
            res.status(httpStatus.METHOD_NOT_ALLOWED)
               .json(responseJson(false, { }, httpStatus.METHOD_NOT_ALLOWED, 'errors.method_not_allowed'))
    }
}
export default addUserToApi(notifications)
