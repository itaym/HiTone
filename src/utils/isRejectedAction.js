const isRejectedAction = function(action) {
    return action.type.endsWith('/rejected')
}
export default isRejectedAction