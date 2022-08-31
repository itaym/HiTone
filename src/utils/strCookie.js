const strCookie = function(name, data, expire, httpOnly = true) {
    return '' +
        `${name}=${data};` +
        `Expires=${new Date(Date.now() + expire)};` +
        `httpOnly=${httpOnly};` +
        `maxAge=${expire};` +
        `path=/;` +
        `sameSite=Strict;` +
        `secure=${process.env.NODE_ENV === "production"};`
}

export default strCookie