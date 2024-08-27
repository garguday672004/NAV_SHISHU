import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  reqValue: 'not accepted',
}

export const pmSlice = createSlice({
  name: 'pm',
  initialState,
  reducers: {
    setReqValue: (state) => {
      state.reqValue = 'accepted';
    },
  },
})

export const { setReqValue } = pmSlice.actions

export default pmSlice.reducer