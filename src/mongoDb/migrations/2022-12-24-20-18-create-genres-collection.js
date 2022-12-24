const MongoDb = process['_mongo_db']

module.exports = {
    down: async () => {
        console.log('migrating down : remove genres collection')
        await MongoDb.db['command'](
            {
                drop: 'genres',
            }
        )
    },
    up: async () => {
        console.log('migrating up : create genres collection')
        await MongoDb.db['command'](
            {
                create: 'genres',
            }
        )
    }
}