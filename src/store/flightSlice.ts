import {createAsyncThunk, createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {toast} from 'react-hot-toast';
import type {FlightSearchParams} from "../types/flightSearchParams.ts";
import api from "../utility/apiClient.ts";
import type {Itinerary} from "../types/itinerary.ts";
import type {Leg} from "../types/leg.ts";
import type {Carrier} from "../types/carrier.ts";
import type {Marketing} from "../types/marketing.ts";

interface FlightResultsState {
  isLoading: boolean,
  isError: boolean,
  flights: Itinerary[] | [];
}

const initialState: FlightResultsState = {
  isLoading: false,
  isError: false,
  flights: []
};

const doGetFlights = createAsyncThunk(
  'fetchFlights',
  async (params: FlightSearchParams) => {
    try {
      const response = await api.get('/flights/searchFlights', {
        params: {
          ...params,
          sortBy: 'best',
          currency: 'USD',
          market: 'en-US',
          countryCode: 'US'
        }
      });

      return response.data.data.context.itineraries.map((it: Itinerary) => ({
        id: it.id,
        price: it.price.formatted,
        legs: it.legs.map((leg: Leg) => ({
          id: leg.id,
          origin: leg.origin.name,
          destination: leg.destination.name,
          departure: leg.departure,
          arrival: leg.arrival,
          durationInMinutes: leg.durationInMinutes,
          stopCount: leg.stopCount,
          carriers: leg.carriers.flatMap((carrier: Carrier) =>
            carrier.marketing.map((m: Marketing) => ({
              id: m.id,
              name: m.name,
              logoUrl: m.logoUrl
            }))
          )
        }))
      }));
    } catch (error) {
      toast.error("Unable to retrieve flights. Try again later.");
      console.error(error)
    }
  }
);


const flightResultsSlice = createSlice({
  name: 'flightResults',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(doGetFlights.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(doGetFlights.fulfilled, (state, action: PayloadAction<Itinerary[]>) => {
        state.isLoading = false;
        state.flights = action.payload;
      })
      .addCase(doGetFlights.rejected, (state, action) => {
        state.isLoading = false;
        console.error("Error", action.payload);
        state.isError = true;
      });
  }
});

export default flightResultsSlice.reducer;
export {doGetFlights};