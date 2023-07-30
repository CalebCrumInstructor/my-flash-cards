import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: 'dark',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setThemeMode: (state, action) => {
      state.mode = action.payload;
    },
  },
})

export const { toggleTheme, setThemeMode } = themeSlice.actions

export const getTheme = () => (state) =>
  state?.[themeSlice.name];


export default themeSlice.reducer