import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  signupData: null,
  token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
  loading: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, value) => {
        state.token = value.payload;
    },
    setLoading: (state, value) => {
        state.loading = value.payload;
    },
    setSignupData: (state, value) => {
        state.signupData = value.payload; 
    }
  },
})

// Action creators are generated for each case reducer function
export const { setToken, setLoading, setSignupData } = authSlice.actions

export default authSlice.reducer