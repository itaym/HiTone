const { users_details: usersDetailsSchema } = require('../MongoSchemas.js')
const { users_details: usersDetailsIndex } = require('../MongoIndices.js')

const MongoDb = process['_mongo_db']

module.exports = {
    down: async () => {
        console.log('migrating down : add schema indices to users_details')
        await MongoDb.db['command'](
            {
                collMod: 'users_details',
                validator: {},
            }
        )
        await MongoDb.db.collection('users_details').dropIndexes()
    },
    up: async () => {
        console.log('migrating up : add schema indices to users_details')
        await MongoDb.db['command'](
            {
                collMod: 'users_details',
                validator: usersDetailsSchema.validator,
            }
        )
        await MongoDb.db.collection('users_details').createIndex(usersDetailsIndex.field, usersDetailsIndex.options)
    }
}