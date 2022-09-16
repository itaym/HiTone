const MongoDb = process['_mongo_db']

module.exports = {
    down: async () => {
        console.log('migrating down : add default user')
        await MongoDb.delUser(process.env.MONGODB_DEFAULT_USER)
    },
    up: async () => {
        console.log('migrating up : add default user')
        await MongoDb.createDefaultUser()
    }
}

