import { MongoClient } from 'mongodb'
import schemas from '@/src/mongoDb/MongoSchemas'
import indices from '@/src/mongoDb/MongoIndices'
import { sleep } from '@/src/utils'
import { TIME_UNITS } from '@/src/enumerators'

// noinspection JSUnusedGlobalSymbols
export const _close = async function() {
    if (this._isConnected) {
        return await this._client.close()
    }
}
export const _connect = async function() {
    // noinspection JSCheckFunctionSignatures
    this._client = new MongoClient(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, })
    this._client.on('connectionReady', this._onConnect)
    this._client.on('serverOpening', this._onConnect)
    this._client.on('connectionClosed', this._onDisconnect)
    this._client.on('serverClosed', this._onDisconnect)

    await this._client.connect()
    this._db = await this._client.db( process.env.MONGODB_DB)
    await this._db.command({ ping: 1 })
    this._isConnected = true
    await this._createCollections()

    return this._db
}
export const _createCollections = async function() {
    await this._verifyConnection()

    const collections = await this._db.listCollections().toArray() || []
    const colsNames = collections.map((element) => element.name)
    const schemaNames = Object.keys(schemas)

    for (let name of schemaNames) {
        if (!colsNames.includes(name)) {
            try {
                await this._db.createCollection(name, schemas[name]);
                if (indices[name]) {
                    await this.db.collection(name).createIndex(indices[name].field, indices[name].options)
                }
                if (name === 'users') {
                    await this._createDefaultUser()
                }
            }
            catch (e) {
                console.log(e)
            }
        }
    }
}
export const _onConnect = function() {
    this._isConnected = true
}
export const _onDisconnect = function() {
    this._isConnected = false
}
export const _verifyConnection = async function() {
    if(this._isConnected) return this._isConnected

    let timeOut = 0
    try {
        for (let tries = 0; tries < 4; tries++) {
            try {
                await this._connect()
            } catch (e) {
                await sleep(timeOut)
            }

            timeOut += TIME_UNITS.SECOND / 4

            if (this._isConnected) {
                return this._isConnected
            }
        }
    }
    catch {}
    const err = new Error('Error connecting to the DB')
    throw(err)
}
