import propTypes from 'prop-types'
import NOTIFICATION from '@/enumerators/NOTIFICATION'

const TypeNotification = {
    _id: propTypes.string.isRequired,
    message: propTypes.string.isRequired,
    time: propTypes.number.isRequired,
    type: propTypes.oneOf([NOTIFICATION.TYPE_ERROR, NOTIFICATION.TYPE_NOTIFY]),
}
export default TypeNotification