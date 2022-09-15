const objectIdFromDate = (date) => {

    if (!objectIdFromDate.counter) {
        objectIdFromDate.counter = Math.floor(Math.random() * (16_773_120 - 1_048_576) + 1_048_576)
    }
    objectIdFromDate.counter++
    const time = (Math.floor(date.valueOf() / 1000)).toString(16)
    const random = (Math.floor(Math.random() * (1_099_511_627_775 - 68_719_476_736) + 68_719_476_736)).toString(16)
    const counter = (objectIdFromDate.counter).toString(16)

    return `${time}${random}${counter}`
}

export default objectIdFromDate