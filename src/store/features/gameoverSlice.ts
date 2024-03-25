import { createSlice } from "@reduxjs/toolkit"

type InitialState = {
  gameover:boolean,
}

const initialState:InitialState = {
  gameover:true,
}

export const gameoverSlice = createSlice({
  name:"gameover",
  initialState,
  reducers:{
    over:(state)=> {
      state.gameover = true
    },
    notOver:(state)=> {
      state.gameover = false
    }
  }
})

export default gameoverSlice.reducer;
export const { over,notOver } = gameoverSlice.actions