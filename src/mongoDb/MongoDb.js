import { MongoClient } from 'mongodb'
import schemas from '@/src/MongoDb/MongoSchemas'
import {
    dateFromObjectId,
    genRandomString,
    sha512,
    sleep,
} from '@/src/utils'
import { TIME_UNITS } from '@/src/enumerators'

// noinspection JSUnresolvedVariable
class MongoDb {

    _isConnected = false

    _onConnect = () => {
        this._isConnected = true
    }
    _onDisconnect = () => {
        this._isConnected = false
    }
    /* --------------------
    Methods implementations
    -------------------- */
    async _addUser(name, password, data) {
        const userName = name.toLowerCase()
        await this._verifyConnection()

        const user = await this.getUser(userName)
        if (user) {
            throw {message: 'User already exists'}
        }
        let newData = { ...data }
        //Just in case
        delete newData.password
        delete newData.email

        const salt = genRandomString(128)
        const passObject = sha512( password, salt)
        const result = await this._db.collection('users').insertOne({name: userName, password: passObject})
        newData.userId = result.insertedId
        await this._db.collection('users_details').insertOne(newData)
        return await this._getUser(userName)
    }
    async _close() {
        if (this._isConnected) {
            return await this._client.close()
        }
    }
    async _connect() {
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
    async _createCollections() {
        await this._verifyConnection()

        const collections = await this._db.listCollections().toArray() || []
        const colsNames = collections.map((element) => element.name)
        const NOT_FOUND = -1

        for (let colName of colsNames) {
            await this._db.createCollection(colName, schemas[colName])
        }
        if (colsNames.indexOf('users') === NOT_FOUND) {
            await this._createDefaultUser()
        }
    }
    async _createDefaultUser() {
        await this._verifyConnection()
        debugger
        const collectionUsers = await this._db.collection('users')
        // noinspection JSUnresolvedFunction
        const users = await collectionUsers.find({}).toArray()

        if(users.length === 0) {
            let data = JSON.parse(process.env.MONGODB_DEFAULT_DATA)
            await this.addUser(process.env.MONGODB_DEFAULT_USER, process.env.MONGODB_DEFAULT_PASS, data)
        }
    }
    async _delUser(name) {
        await this._verifyConnection()
        await this._db.collection('users').deleteOne({ name })
    }
    async _getUser(name = Math.random() + '') {
        await this._verifyConnection()
        const u = await this._db.collection('users').findOne({name})
        console.log(u, name, name.length)
        return u
    }
    async _getUsers() {
        await this._verifyConnection()
        let users = await this._db.collection('users').find({}).toArray()
        users = [...users].map((element) =>({
            _id: element._id,
            name: element.name,
            created: dateFromObjectId(element._id.toString()),
            lastLogin: element.lastLogin
        }))
        return users
    }
    async _setLastLogin(name) {
        await this._verifyConnection()
        const user = await this.getUser(name)

        if(!user) {
            throw {message: 'User was not found'}
        }
        await this._db.collection('users').updateOne({_id: user._id}, {$set: {lastLogin: new Date()}})
    }
    async _verifyConnection() {
        if(this._isConnected) return this._isConnected

        let timeOut = 0
        for(let tries = 0; tries < 4; tries++) {
            try {
                 await this._connect()
            }
            catch {
                await sleep(timeOut)
            }

            timeOut += TIME_UNITS.SECOND / 4

            if (this._isConnected) {
                return this._isConnected
            }
        }
        const err = new Error('Error connecting to the DB')
        throw(err)
    }
    /* --------------------
    Getters
    -------------------- */
    get connected() {
        return this._isConnected
    }
    get db() {
        return this._db
    }
    /* --------------------
    Methods
    -------------------- */
    async addUser(name, password, data) {
        return await this._addUser(name, password, data)
    }
    async close() {
        return await this._close()
    }
    async connect() {
        return await this._connect()
    }
    async createDefaultUser() {
        await this._createDefaultUser()
    }
    async delUser(name) {
        return await this._delUser(name)
    }
    async getUser(name) {
        return await this._getUser(name)
    }
    async getUsers() {
        return await this._getUsers()
    }
    async setLastLogin(name) {
        return await this._setLastLogin(name)
    }
    async verifyConnection() {
        return await this._verifyConnection()
    }
}
if (!process._mongo_db) {
    process._mongo_db = new MongoDb()
}
module.exports = process._mongo_db || new MongoDb()