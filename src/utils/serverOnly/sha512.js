import crypto from 'crypto'

const sha512 = function(password, salt) {
    const hash = crypto.createHmac('sha512', salt)
    hash.update(password)
    const value = hash.digest('hex')
    return {
        salt: salt,
        hash: value
    }
}

export default sha512