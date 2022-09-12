import { objectIdFromDate } from '@/src/utils'
import { NOTIFICATION } from '@/src/enumerators'

const createError = error => {
    return {
        _id: objectIdFromDate(new Date()),
        message: error,
        time: new Date().valueOf(),
        type: NOTIFICATION.TYPE_ERROR
    }
}

export default createError