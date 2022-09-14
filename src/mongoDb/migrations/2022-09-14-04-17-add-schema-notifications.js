const { notifications: notificationsSchema } = require('../MongoSchemas.js')
const { notifications: notificationsIndex } = require('../MongoIndices.js')

const MongoDb = process['_mongo_db']

module.exports = {
    down: async () => {
        console.log('migrating down : add schema indices to notifications')
        await MongoDb.db['command'](
            {
                collMod: 'notifications',
                validator: {},
            }
        )
        await MongoDb.db.collection('notifications').dropIndexes()
    },
    up: async () => {
        console.log('migrating up : add schema indices to notifications')
        await MongoDb.db['command'](
            {
                collMod: 'notifications',
                validator: notificationsSchema.validator,
            }
        )
        await MongoDb.db.collection('notifications').createIndex(notificationsIndex.field, notificationsIndex.options)
    }
}