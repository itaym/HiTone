import { createReducer } from '@reduxjs/toolkit'
import * as actions from '@/redux/actions/users'

const initialState = {
    user: {}
}

const users = createReducer(initialState, (builder) => {
    builder
        .addCase(actions.getUser.fulfilled, (state, action) => {
            state.user = action.payload.user
        })
        .addCase(actions.login.fulfilled, (state, action) => {
            state.user = action.payload.user
        })
        .addCase(actions.login.rejected, (state) => {
            state.user = {}
        })
        .addCase(actions.logout.fulfilled, (state) => {
            state.user = {}
        })
        .addCase(actions.logout.rejected, (state) => {
            state.user = {}
        })
        .addCase(actions.registration.fulfilled, (state, action) => {
            state.user = action.payload.user
        })
        .addCase(actions.registration.rejected, (state) => {
            state.user = {}
        })
})

export default users