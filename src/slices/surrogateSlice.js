import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  step: 1,
}

export const surrogateSlice = createSlice({
  name: 'surrogate',
  initialState,
  reducers: {
    setStep: (state, action) => {
        state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setStep } = surrogateSlice.actions

export default surrogateSlice.reducer