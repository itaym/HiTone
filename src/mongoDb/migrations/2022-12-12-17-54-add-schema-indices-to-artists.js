const { artists: artistsSchema } = require('../MongoSchemas.js')
const { artists: artistsIndex } = require('../MongoIndices.js')

const MongoDb = process['_mongo_db']

module.exports = {
    down: async () => {
        console.log('migrating down : remove schema indices to artists')
        await MongoDb.db['command'](
            {
                collMod: 'artists',
                validator: {},
            }
        )
        await MongoDb.db.collection('artists').dropIndexes()
    },
    up: async () => {
        console.log('migrating up : add schema to artists')
        await MongoDb.db['command'](
            {
                collMod: 'artists',
                validator: artistsSchema.validator,
            }
        )
        await MongoDb.db.collection('artists').createIndex(artistsIndex.field)
    }
}