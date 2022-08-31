import jwt from 'jsonwebtoken'

function getUserFromRequest(req) {
    let tokenObj = { user: {} }
    try {
        const token = req.cookies['auth']
        tokenObj = jwt.verify(token, process.env.JWT_SECRET)
    }
    catch { }
    return tokenObj?.user || {}
}

export default getUserFromRequest