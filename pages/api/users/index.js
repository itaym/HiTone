import httpStatus from 'http-status'
import responseJson from '@/utils/responseJson'
import { addUserToApi } from '@/src/utils'
import MongoDb from '@/src/mongoDb'

const getUser = (res, user) => {
    // this is very strange 'user_details' collection exists without creating it.
    // todo: understand this shit
    MongoDb.connect().then()
    res.status(httpStatus.OK).json(responseJson(true, { user: user }, httpStatus.OK))
}
const users = (req, res, user) => {
    switch (req.method) {
        default:
            getUser(res, user)
    }
}
export default addUserToApi(users)
