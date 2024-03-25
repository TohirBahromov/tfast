import { createSlice } from "@reduxjs/toolkit"

type InitialState = {
  isRunning:boolean
}

const initialState:InitialState = {
  isRunning:false
}

export const timerSlice = createSlice({
  name:"timer",
  initialState,
  reducers:{
    running:(state)=> {
      state.isRunning = true
    },
    notRunning:(state)=> {
      state.isRunning = false
    }
  }
})

export default timerSlice.reducer;
export const { running,notRunning } = timerSlice.actions