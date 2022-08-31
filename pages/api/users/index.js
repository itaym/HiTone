import httpStatus from 'http-status'
import responseJson from '@/utils/responseJson'
import { addUserToApi } from '@/src/utils'

const getUser = (res, user) => {
    res.status(httpStatus.OK).json(responseJson(true, { user: user }, httpStatus.OK))
}
const users = (req, res, user) => {
    switch (req.method) {
        default:
            getUser(res, user)
    }
}
export default addUserToApi(users)