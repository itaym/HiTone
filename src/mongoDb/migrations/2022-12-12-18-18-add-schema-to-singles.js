const { singles: singlesSchema } = require('../MongoSchemas.js')

const MongoDb = process['_mongo_db']

module.exports = {
    down: async () => {
        console.log('migrating down : remove singles schema')
        await MongoDb.db['command'](
            {
                collMod: 'singles',
                validator: {},
            }
        )
    },
    up: async () => {
        console.log('migrating up : add singles schema')
        await MongoDb.db['command'](
            {
                collMod: 'singles',
                validator: singlesSchema.validator,
            }
        )
    }
}