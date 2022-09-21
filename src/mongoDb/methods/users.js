import { dateFromObjectId } from '@/src/utils'
import { genRandomString, sha512 } from '@/src/utils/serverOnly'

export const _addUser = async function(name, password, data) {
    await this._verifyConnection()

    if (!name || !password) {
        throw new Error('errors.user_was_not_found')
    }
    const userName = name.toLowerCase()
    const user = await this.getUser(userName)

    if (user) {
        throw new Error('errors.user_cannot_be_created')
    }
    let newData = { ...data }
    //Just in case
    delete newData.password
    delete newData.email

    const salt = genRandomString(128)
    const passObject = sha512(password, salt)
    const result = await this._db.collection('users').insertOne({ name: userName, password: passObject })

    newData.userId = result['insertedId']
    newData.birthDate = new Date(newData.birthDate)

    await this._db.collection('users_details').insertOne(newData)
    return await this._getUser(userName)
}

export const _createDefaultUser = async function() {
    await this._verifyConnection()

    const collectionUsers = await this._db.collection('users')
    // noinspection JSUnresolvedFunction
    const users = await collectionUsers.find({}).toArray()
    // noinspection JSUnresolvedVariable
    if (users.length === 0) {
        let data = JSON.parse(process.env.MONGODB_DEFAULT_DATA)
        await this.addUser(process.env.MONGODB_DEFAULT_USER, process.env.MONGODB_DEFAULT_PASS, data)
    }
}

export const _delUser = async function(name) {
    await this._verifyConnection()

    const user = await this._db.collection('users').findOne({ name })
    await this._db.collection('users_details').deleteOne({ userId: user['_id'] })
    await this._db.collection('users').deleteOne({ name })
}

export const _getUser = async function(name = Math.random() + '') {
    await this._verifyConnection()

    return await this._db.collection('users').findOne({name})
}

export const _getUsers = async function() {
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

export const _getUserWithDetails = async function(name = Math.random() + '') {
    await this._verifyConnection()

    const user = await this._getUser(name)
    if (!user) {
        throw new Error('errors.user_was_not_found')
    }
    const details = await this._db.collection('users_details').findOne({ userId: user['_id'] })
    return { user, details: { middleName: '', ...details } }
}

export const _setLastLogin = async function(name) {
    await this._verifyConnection()

    const user = await this.getUser(name)

    if (!user) {
        throw new Error('errors.user_was_not_found')
    }
    await this._updateUser(user['_id'], { lastLogin: new Date() })
}

export const _updateUser = async function(objectId, data) {
    await this._verifyConnection()

    await this._db.collection('users').updateOne({ _id: objectId },{ $set: data })
}
