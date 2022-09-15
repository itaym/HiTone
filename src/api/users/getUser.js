import httpStatus from 'http-status'
import responseJson from '@/utils/serverOnly/responseJson'

const getUser = async (res, user) => {
    res.status(httpStatus.OK).json(responseJson(true, { user: user }, httpStatus.OK))
}

export default getUser
