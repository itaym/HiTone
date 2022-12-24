const { genres: genresSchema } = require('../MongoSchemas.js')
const { genres: genresIndex } = require('../MongoIndices.js')

const MongoDb = process['_mongo_db']

module.exports = {
    down: async () => {
        console.log('migrating down : remove schema to genres')
        await MongoDb.db['command'](
            {
                collMod: 'genres',
                validator: {},
            }
        )
        await MongoDb.db.collection('genres').dropIndexes()
    },
    up: async () => {
        console.log('migrating up : add schema to genres')
        await MongoDb.db['command'](
            {
                collMod: 'genres',
                validator: genresSchema.validator,
            }
        )
        await MongoDb.db.collection('genres').createIndex(genresIndex.field)
    }
}