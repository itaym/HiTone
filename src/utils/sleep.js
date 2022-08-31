const sleep = function(milliseconds) {
    return new Promise(function(resolve) {
        setTimeout(function (time) {
            resolve(time)
        }, milliseconds, milliseconds)
    })
}
export default sleep