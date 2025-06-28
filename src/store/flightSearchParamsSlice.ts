import type {FlightSearchParams} from "../types/flightSearchParams.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

const flightSearchParamsSlice = createSlice({
  name: "flightSearchParams",
  initialState: null as FlightSearchParams | null,
  reducers: {
    setFlightSearchParams: (_state, action: PayloadAction<FlightSearchParams>) => action.payload,
    resetFlightSearchParams: () => null,
  },
});

export const {setFlightSearchParams, resetFlightSearchParams} = flightSearchParamsSlice.actions;
export default flightSearchParamsSlice.reducer;