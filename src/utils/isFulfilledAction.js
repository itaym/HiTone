const isFulfilledAction = function(action) {
    return action.type.endsWith('/fulfilled')
}
export default isFulfilledAction