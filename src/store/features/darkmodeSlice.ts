import { createSlice } from "@reduxjs/toolkit"

type InitialState = {
  darkmode:boolean
}

const initialState:InitialState = {
  darkmode:true
}

export const darkmodeSlice = createSlice({
  name:"darkmode",
  initialState,
  reducers:{
    toggleDarkMode:(state)=>{
      state.darkmode = !state.darkmode
    }
  }
})

export default darkmodeSlice.reducer;
export const { toggleDarkMode } = darkmodeSlice.actions