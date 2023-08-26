import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import navSlice from './slices/navSlice'
import themeSlice from './slices/themeSlice'
import homeFolderSlice from './slices/homeFolderSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    nav: navSlice,
    theme: themeSlice,
    homeFolder: homeFolderSlice,
  },
})