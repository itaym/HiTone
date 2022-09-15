import { genRandomString, sha512 } from '@/utils/serverOnly'
import { ObjectId } from 'mongodb'

export const _addResetPassword = async function(name, password) {
    await this._verifyConnection()
    const userName = name.toLowerCase()
    const user = await this.getUser(userName)
    if (!user) {
        throw {message: 'User doesn\'t exist'}
    }
    const salt = genRandomString(128)
    const passObject = sha512( password, salt)

    const resetPassword = {
        createdAt: new Date(),
        name: userName,
        password: passObject
    }
    const result = await this._db.collection('reset_password').insertOne(resetPassword)
    return await this._getResetPassword(result['insertedId'])
}
export const _delResetPassword = async function(_id) {
    await this._verifyConnection()
    await this._db.collection('reset_password').deleteOne({ _id: new ObjectId(_id) })
}
export const _getResetPassword = async function(_id) {
    await this._verifyConnection()
    return await this._db.collection('reset_password').findOne({ _id: new ObjectId(_id) })
}
