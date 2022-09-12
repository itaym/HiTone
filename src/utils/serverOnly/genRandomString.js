import crypto from 'crypto'

const genRandomString = function(length) {
    return crypto.randomBytes(Math.ceil(length))
        .toString('base64')
        .slice(0,length)
}

export default genRandomString