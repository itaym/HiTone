const responseJson = function(ok, payload, status, error) {
    return {
        error,
        ok,
        payload,
        status
    }
}
export default responseJson