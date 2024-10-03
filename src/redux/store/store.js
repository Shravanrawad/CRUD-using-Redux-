import { configureStore } from '@reduxjs/toolkit'
import userDetailsReducer from '../features/userSlice'

export const store = configureStore({
    reducer: {
        app : userDetailsReducer
    }
})