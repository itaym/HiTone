import root from '@/redux/reducers/root'
import users from '@/redux/reducers/users'
import { combineReducersWithRoot } from '@/src/utils'
import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

const reducer = combineReducersWithRoot(root, { users })

export const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
})

const makeStore = () => store

export const wrapper = createWrapper(makeStore)