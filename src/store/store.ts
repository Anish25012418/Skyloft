import {configureStore} from "@reduxjs/toolkit";
import flightSearchParamsReducer from "./flightSearchParamsSlice.ts";

export const store = configureStore({
  reducer: {
    flightSearchParams: flightSearchParamsReducer
  }
});

export type RootState = ReturnType<typeof store.dispatch>;
export type AppDispatch = typeof store.dispatch;