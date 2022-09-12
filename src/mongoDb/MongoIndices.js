import { TIME_UNITS } from '@/src/enumerators'

module.exports =  {
    notifications: {
        field: { "to": 1, "status": 1 },

    },
    resetPassword: {
        field: { "createdAt": 1 },
        options: { expireAfterSeconds: TIME_UNITS.HOUR / TIME_UNITS.SECOND },
    },
    users: {
        field: { name: 1 },
        options: { unique: true },
    },
};