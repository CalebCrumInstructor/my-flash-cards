import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import navSlice from './slices/navSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    nav: navSlice,
  },
})