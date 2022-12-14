import { getUserFromRequest } from '@/utils/serverOnly/index'

const addUserToApi = (handler) => {
    return function(req, res) {
        const user = getUserFromRequest(req)
        return handler(req, res, user)
    }
}

export default addUserToApi