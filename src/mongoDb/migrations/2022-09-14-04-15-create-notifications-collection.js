const MongoDb = process['_mongo_db']

module.exports = {
    down: async () => {
        console.log('migrating down : create notifications collection')
        await MongoDb.db['command'](
            {
                drop: 'notifications',
            }
        )
    },
    up: async () => {
        console.log('migrating up : create notifications collection')
        await MongoDb.db['command'](
            {
                create: 'notifications',
            }
        )
    }
}