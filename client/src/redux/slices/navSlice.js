import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sideNavOpen: true,
}

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    toggleSideNav: (state) => {
      state.sideNavOpen = !state.sideNavOpen;
    },
  },
})

export const { toggleSideNav } = navSlice.actions

export const getNav = () => (state) =>
  state?.[navSlice.name];


export default navSlice.reducer