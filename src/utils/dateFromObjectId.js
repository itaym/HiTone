import TIME_UNITS from '@/enumerators/TIME_UNITS'

const dateFromObjectId = function(objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * TIME_UNITS.SECOND)
}

export default dateFromObjectId