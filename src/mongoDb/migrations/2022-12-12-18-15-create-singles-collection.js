const MongoDb = process['_mongo_db']

module.exports = {
    down: async () => {
        console.log('migrating down : remove singles collection')
        await MongoDb.db['command'](
            {
                drop: 'singles',
            }
        )
    },
    up: async () => {
        console.log('migrating up : create singles collection')
        await MongoDb.db['command'](
            {
                create: 'singles',
            }
        )
    }
}