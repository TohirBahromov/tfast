import { createSlice } from "@reduxjs/toolkit"

type InitialState = {
  remainingTime:number
}

const initialState:InitialState = {
  remainingTime:15
}

export const remainingTimeSlice = createSlice({
  name:"remainingTime",
  initialState,
  reducers:{
    handleRemainingTime:(state,action) => {
      state.remainingTime = action.payload
    }
  }
})

export default remainingTimeSlice.reducer;
export const { handleRemainingTime } = remainingTimeSlice.actions