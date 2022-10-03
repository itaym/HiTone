const { reset_password: resetPasswordSchema } = require('../MongoSchemas.js')
const { reset_password: resetPasswordIndex } = require('../MongoIndices.js')

const MongoDb = process['_mongo_db']

module.exports = {
    down: async () => {
        console.log('migrating down : add schema indices to reset_password')
        await MongoDb.db['command'](
            {
                collMod: 'reset_password',
                validator: {},
            }
        )
        await MongoDb.db.collection('reset_password').dropIndexes()
    },
    up: async () => {
        console.log('migrating up : add schema indices to reset_password')
        await MongoDb.db['command'](
            {
                collMod: 'reset_password',
                validator: resetPasswordSchema.validator,
            }
        )
        await MongoDb.db.collection('reset_password').createIndex(resetPasswordIndex.field, resetPasswordIndex.options)
    }
}