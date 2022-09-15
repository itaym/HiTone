import * as actions from '@/redux/actions/root'
import { createReducer } from '@reduxjs/toolkit'
import { isFulfilledAction, isPendingAction, isRejectedAction } from '@/src/utils'

const initialState = {
    isLoading: false,
    errors: [],
    notifications: [],
}

const root = createReducer(initialState, (builder) => {
    builder
        .addCase(actions.addError.fulfilled, (state, action) => {
            state.errors = action.payload
        })
        .addCase(actions.clearAllErrors.fulfilled, (state, action) => {
            state.errors = action.payload
        })
        .addCase(actions.clearError.fulfilled, (state, action) => {
            state.errors = action.payload
        })
        .addCase(actions.clearNotification.fulfilled, (state, action) => {
            state.notifications = action.payload
        })
        .addCase(actions.getNotifications.fulfilled, (state, action) => {
            state.notifications = action.payload.notifications
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