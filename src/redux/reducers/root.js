import * as actions from '@/redux/actions/root'
import { createReducer } from '@reduxjs/toolkit'
import { isFulfilledAction, isPendingAction, isRejectedAction } from '@/src/utils'

const initialState = {
    isLoading: false,
    errors: [],
}

const root = createReducer(initialState, (builder) => {
    builder
        .addCase(actions.clearAllErrors.fulfilled, (state, action) => {
            state.errors = action.payload
        })
        .addCase(actions.clearError.fulfilled, (state, action) => {
            state.errors = action.payload
        })
        .addMatcher(isPendingAction, (state) => {
            state.isLoading = true
        })
        .addMatcher(isFulfilledAction, (state) => {
            state.isLoading = false
        })
        .addMatcher(isRejectedAction, (state, action) => {
            if (action.payload) {
                state.errors.push(action.payload)
            }
            state.isLoading = false
        })
})

export default root