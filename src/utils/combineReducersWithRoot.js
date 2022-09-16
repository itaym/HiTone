const combineReducersWithRoot = function(rootReducer, reducers) {
    return function(state, action) {
        let newState = {...rootReducer(state, action)}

        Object.keys(reducers).forEach(reducerName => {
            let domainState = state ? state[reducerName] || {} : {}
            newState[reducerName] = { ...reducers[reducerName](domainState, action)}
        })
        return newState
    }
}

export default combineReducersWithRoot