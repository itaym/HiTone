import React from 'react'
import propTypes from 'prop-types'

const Conditional = ({condition, children}) => {
    return condition ? children : null
}

Conditional.propTypes = {
    condition: propTypes.bool
}
export default Conditional