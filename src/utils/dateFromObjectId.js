const dateFromObjectId = function(objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000)
}

export default dateFromObjectId