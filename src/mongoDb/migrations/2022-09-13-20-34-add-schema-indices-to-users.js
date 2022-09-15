const { users: usersSchema } = require('../MongoSchemas.js')
const { users: usersIndex } = require('../MongoIndices.js')

const MongoDb = process['_mongo_db']

module.exports = {
    down: async () => {
        console.log('migrating down : add schema indices to user')
        await MongoDb.db['command'](
            {
                collMod: 'users',
                validator: {},
            }
        )
        await MongoDb.db.collection('users').dropIndexes()
    },
    up: async () => {
        console.log('migrating up : add schema indices to user')
        await MongoDb.db['command'](
            {
                collMod: 'users',
                validator: usersSchema.validator,
            }
        )
        await MongoDb.db.collection('users').createIndex(usersIndex.field, usersIndex.options)
    }
}