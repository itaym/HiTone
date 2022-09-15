const MongoDb = process['_mongo_db']

module.exports = {
    down: async () => {
        console.log('migrating down : create users_details collection')
        await MongoDb.db['command'](
            {
                drop: 'users_details',
            }
        )
    },
    up: async () => {
        console.log('migrating up : create users_details collection')
        await MongoDb.db['command'](
            {
                create: 'users_details',
            }
        )
    }
}