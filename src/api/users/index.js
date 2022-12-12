import getUser from '@/src/api/users/getUser'
import httpStatus from 'http-status'
import registration from '@/src/api/users/registration'
import responseJson from '@/utils/serverOnly/responseJson'
import { addUserToApi } from '@/src/utils/serverOnly'

const users = async (req, res, user) => {
    switch (req.method) {
        case 'DELETE':
            break
        case 'GET': await getUser(res, user)
            break
        case 'PATCH':
            break
        case 'POST': await registration(req, res, user)
            break
        default:
            res.status(httpStatus.METHOD_NOT_ALLOWED)
               .json(responseJson(false, { }, httpStatus.METHOD_NOT_ALLOWED, 'errors.method_not_allowed'))
    }
}
export default addUserToApi(users)
