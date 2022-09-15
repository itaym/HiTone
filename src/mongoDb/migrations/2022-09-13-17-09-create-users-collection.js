const MongoDb = process['_mongo_db']

module.exports = {
    down: async () => {
        console.log('migrating down : create users collection')
        await MongoDb.db['command'](
            {
                drop: 'users',
            }
        )
    },
    up: async () => {
        console.log('migrating up : create users collection')
        await MongoDb.db['command'](
            {
                create: 'users',
            }
        )
    }
}