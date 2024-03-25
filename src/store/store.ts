import { configureStore } from "@reduxjs/toolkit";
import { darkmodeSlice } from "./features/darkmodeSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { timerSlice } from "./features/timerSlice";
import { remainingTimeSlice } from "./features/remainingTimeSlice";
import { gameoverSlice } from "./features/gameoverSlice";

export const store = configureStore({
  reducer:{
    darkmode: darkmodeSlice.reducer,
    timer: timerSlice.reducer,
    remaininingTime:remainingTimeSlice.reducer,
    gameover:gameoverSlice.reducer
  }
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;