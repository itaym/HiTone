import { TIME_UNITS } from '@/enumerators/enumerators'

module.exports =  {
    users: {
        field: { name: 1 },
        options: { unique: true },
    },
    resetPassword: {
        field: { "createdAt": 1 },
        options: { expireAfterSeconds: TIME_UNITS.HOUR / TIME_UNITS.SECOND },
    }
};