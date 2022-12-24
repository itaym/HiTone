module.exports = {
    notifications: {
        field: { "to": 1, "status": 1 },
    },
    reset_password: {
        field: { "createdAt": 1 },
        options: { expireAfterSeconds: 3600 },
    },
    users: {
        field: { name: 1 },
        options: { unique: true },
    },
    users_details: {
        field: { userId: 1 },
        options: { unique: true },
    },
    artists: {
        field: { name: 1 },
    },
    genres: {
        field: { name: 1 }
    }

}