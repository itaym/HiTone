const MongoDb = process['_mongo_db']

module.exports = {
    down: async () => {
        console.log('migrating down : create reset_password collection')
        await MongoDb.db['command'](
            {
                drop: 'reset_password',
            }
        )
    },
    up: async () => {
        console.log('migrating up : create reset_password collection')
        await MongoDb.db['command'](
            {
                create: 'reset_password',
            }
        )
    }
}