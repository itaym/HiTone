import { createAsyncThunk } from '@reduxjs/toolkit'

const ACTION_CLEAR_ERROR = 'ACTION_CLEAR_ERROR'
const ACTION_CLEAR_ALL_ERRORS = 'ACTION_CLEAR_ALL_ERRORS'

export const clearError = createAsyncThunk(
    ACTION_CLEAR_ERROR,
    async ( error, { rejectWithValue, getState } ) => {
        try {
            const errors = [...getState().errors]
            const index = errors.indexOf(error)
            if (index > -1) {
                errors.splice(index, 1)
            }
            return errors
        }
        catch ( e ) { return rejectWithValue(e.message) }
    }
)

export const clearAllErrors = createAsyncThunk(
    ACTION_CLEAR_ALL_ERRORS,
    async () => []
)
