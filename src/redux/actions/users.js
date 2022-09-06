import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchApi } from '@/src/utils'

const ACTION_GET_USER = 'ACTION_GET_USER'
const ACTION_LOGIN = 'ACTION_LOGIN'
const ACTION_LOGOUT = 'ACTION_LOGOUT'
const ACTION_REGISTRATION = 'ACTION_REGISTRATION'
const ACTION_SET_USER = 'ACTION_SET_USER'

export const getUser = createAsyncThunk(
    ACTION_GET_USER,
    async (_, { rejectWithValue }) => {
        try {
            const json = await fetchApi('/users')
            if (json.ok) {
                return json.payload
            }
            return rejectWithValue( json.error )
        }
        catch ( e ) { return rejectWithValue(e.message) }
    }
)

export const login = createAsyncThunk(
    ACTION_LOGIN,
    async (args, { rejectWithValue }) => {
        try {
            const json = await fetchApi('/users/auth/login', { method: 'POST' }, JSON.stringify(args))
            if (json.ok) {
                return json.payload
            }
            return rejectWithValue(json.error)
        }
        catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const logout = createAsyncThunk(
    ACTION_LOGOUT,
    async ( args, { rejectWithValue }) => {
        try {
            const ud = undefined
            const json = await fetchApi('/users/auth/logout', ud, ud, ud, args)
            if (json.ok) {
                return json.payload
            }
            return rejectWithValue(json.error)
        }
        catch (e) { return rejectWithValue(e.message) }
    }
)

export const registration = createAsyncThunk(
    ACTION_REGISTRATION,
    async ( args, { rejectWithValue }) => {
        try {
            const json = await fetchApi('/users', { method: 'POST'}, args)
            if (json.ok) {
                return json.payload
            }
            return rejectWithValue(json.error)
        }
        catch (e) { return rejectWithValue(e.message) }
    }
)

export const setUser = createAsyncThunk(
    ACTION_SET_USER,
    async (user) => ({ user })
)