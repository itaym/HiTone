import { MongoClient } from 'mongodb'
import { sleep } from '@/src/utils'
import { TIME_UNITS } from '@/src/enumerators'
import { config, up } from 'migrate-mongo'

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
    // this._client.on('serverOpening', this._onConnect)
    this._client.on('connectionClosed', this._onDisconnect)
    // this._client.on('serverClosed', this._onDisconnect)

    await this._client.connect()
    this._db = await this._client.db(process.env.MONGODB_DB)
    await this._db.command({ ping: 1 })

    return this._db
}

export const _onConnect = async function() {
    const self = this
    //if (self._isConnected) debugger
    self._isConnected = true
    setTimeout(async function() {
        await self._migration() }, 0)
}

export const _onDisconnect = function() {
    this._isConnected = false
}

export const _migration = async function() {
    await this._verifyConnection()
    try {
        config.set({
            migrationsDir: "./src/mongoDb/migrations",
            changelogCollectionName: "changelog",
            migrationFileExtension: ".js"
        })
        await up(this.db, this._client)
        await sleep(1000)
    }
    catch(e) {
        console.log(e)
    }
}

export const _verifyConnection = async function() {
    if (this._isConnected) return this._isConnected

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
                await sleep(timeOut)
                return this._isConnected
            }
        }
    }
    catch {}
    const err = new Error('Error connecting to the DB')
    throw(err);
}
