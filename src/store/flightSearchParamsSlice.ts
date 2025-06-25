import type {FlightSearchParams} from "../types/flightSearchParams.ts";
import {createSlice} from "@reduxjs/toolkit";

const initialState: FlightSearchParams | null = null;

const flightSearchParamsSlice = createSlice({
  name: "flightSearchParams",
  initialState,
  reducers: {
    setFlightSearchParams: (_, action) => {
      return action.payload;
    },
    resetFlightSearchParams: () => {
      return null;
    }
  }
})

export const {setFlightSearchParams, resetFlightSearchParams} = flightSearchParamsSlice.actions;
export default flightSearchParamsSlice.reducer;