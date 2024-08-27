import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser: (state, value) => {
        state.user = value.payload;
    },
    setLoading: (state, value) => {
        state.loading = value.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setLoading } = profileSlice.actions

export default profileSlice.reducer