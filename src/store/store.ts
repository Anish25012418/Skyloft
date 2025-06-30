import {configureStore} from "@reduxjs/toolkit";
import flightSearchParamsReducer from "./flightSearchParamsSlice.ts";
import flightSliceReducer from "./flightSlice.ts";

export const store = configureStore({
  reducer: {
    flightSearchParams: flightSearchParamsReducer,
    flights: flightSliceReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;