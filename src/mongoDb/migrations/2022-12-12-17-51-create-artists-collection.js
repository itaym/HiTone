const MongoDb = process['_mongo_db']

module.exports = {
    down: async () => {
        console.log('migrating down : remove artists collection')
        await MongoDb.db['command'](
            {
                drop: 'artists',
            }
        )
    },
    up: async () => {
        console.log('migrating up : create artists collection')
        await MongoDb.db['command'](
            {
                create: 'artists',
            }
        )
    }
}