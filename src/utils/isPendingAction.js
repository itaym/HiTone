const isPendingAction = function(action) {
    return action.type.endsWith('/pending')
}
export default isPendingAction