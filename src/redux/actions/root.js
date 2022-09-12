import { createAsyncThunk } from '@reduxjs/toolkit'
import { createError } from '@/src/utils'
import fetchApi from '@/utils/fetchApi'

const ACTION_ADD_ERROR = 'ACTION_ADD_ERROR'
const ACTION_CLEAR_ALL_ERRORS = 'ACTION_CLEAR_ALL_ERRORS'
const ACTION_CLEAR_ERROR = 'ACTION_CLEAR_ERROR'
const ACTION_CLEAR_NOTIFICATION = 'ACTION_CLEAR_NOTIFICATION'
const ACTION_GET_NOTIFICATIONS = 'ACTION_GET_NOTIFICATIONS'

export const addError = createAsyncThunk(
    ACTION_ADD_ERROR,
    async ( error, { rejectWithValue, getState } ) => {
        try {
            const errors = [...getState().errors]
            return errors.push(createError(error))
        }
        catch ( e ) { return rejectWithValue(createError(e.message)) }
    }
)
export const clearAllErrors = createAsyncThunk(
    ACTION_CLEAR_ALL_ERRORS,
    async () => []
)
export const clearError = createAsyncThunk(
    ACTION_CLEAR_ERROR,
    async ( error, { rejectWithValue, getState } ) => {
        try {
            const errors = [...getState().errors]
            const index = errors.findIndex((e) => e._id === error['_id'])
            if (index > -1) {
                errors.splice(index, 1)
            }
            return errors
        }
        catch ( e ) { return rejectWithValue(createError(e.message)) }
    }
)
export const clearNotification = createAsyncThunk(
    ACTION_CLEAR_NOTIFICATION,
    async ( notification, { rejectWithValue, getState } ) => {
        try {
            await fetchApi('/notifications', { method: 'DELETE'}, { _id: notification['_id']})
            const notifications = [...getState().notifications]
            const index = notifications.indexOf(notification)
            if (index > -1) {
                notifications.splice(index, 1)
            }
            return notifications
        }
        catch ( e ) { return rejectWithValue(createError(e.message)) }
    }
)
export const getNotifications = createAsyncThunk(
    ACTION_GET_NOTIFICATIONS,
    async ( _, { rejectWithValue } ) => {
        try {
            const notifications = await fetchApi('/notifications')
            return notifications.payload
        }
        catch ( e ) { return rejectWithValue(createError(e.message)) }
    }
)
