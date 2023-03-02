import * as mongoDb from '@/src/MongoDb/methods/mongoDb'
import * as notifications from '@/src/MongoDb/methods/notifications'
import * as resetPassword from '@/src/MongoDb/methods/resetPassword'
import * as artists from '@/src/mongoDb/methods/artists'
import * as users from '@/src/mongoDb/methods/users'

// noinspection JSUnusedGlobalSymbols
class MongoDb {
    constructor() {
        this._addNotification = notifications._addNotification
        this._addResetPassword = resetPassword._addResetPassword
        this._addUser = users._addUser
        this._close = mongoDb._close
        this._connect = mongoDb._connect
        this._createDefaultUser = users._createDefaultUser
        this._delNotification = notifications._delNotification
        this._delResetPassword = resetPassword._delResetPassword
        this._delUser = users._delUser
        this._getNotifications = notifications._getNotifications
        this._getResetPassword = resetPassword._getResetPassword
        this._getUser = users._getUser
        this._getUserWithDetails = users._getUserWithDetails
        this._getUsers = users._getUsers
        this._isConnected = false
        this._migration = mongoDb._migration
        this._onConnect = mongoDb._onConnect.bind(this)
        this._onDisconnect = mongoDb._onDisconnect.bind(this)
        this._setLastLogin = users._setLastLogin
        this._updateUser = users._updateUser
        this._verifyConnection = mongoDb._verifyConnection
        this._getArtistProfile = artists._getArtistProfile
    }
    get connected() {
        return this._isConnected
    }
    get db() {
        return this._db
    }
    /* --------------------
    Methods
    -------------------- */
    async addNotification(notification) {
        return await this._addNotification(notification)
    }
    async addResetPassword(name = Math.random() + '', password) {
        return await this._addResetPassword(name, password)
    }
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
    async delNotification(_id) {
        return await this._delNotification(_id)
    }
    async delResetPassword(_id) {
        return await this._delResetPassword(_id)
    }
    async delUser(name) {
        return await this._delUser(name)
    }
    async getNotifications(to, status) {
        return await this._getNotifications(to, status)
    }
    async getResetPassword(objectId) {
        return await this._getResetPassword(objectId)
    }
    async getUser(name) {
        return await this._getUser(name)
    }
    async getUserWithDetails(name) {
        return await this._getUserWithDetails(name)
    }
    async getUsers() {
        return await this._getUsers()
    }
    async setLastLogin(name) {
        return await this._setLastLogin(name)
    }
    async updateUser(objectId, data) {
        return await this._updateUser(objectId, data)
    }
    async verifyConnection() {
        return await this._verifyConnection()
    }
    async getArtistProfile(name) {
        return await this._getArtistProfile(name)
    }

}

if (!process['_mongo_db']) {
    process['_mongo_db'] = new MongoDb()
}
module.exports = process['_mongo_db'] || new MongoDb()
