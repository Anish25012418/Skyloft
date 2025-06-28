import FlightSearch from "../components/FlightSearch.tsx";
import {useAppSelector} from "../hooks/store/hooks.ts";
import {Loader} from "lucide-react";
import type {Leg} from "../types/leg.ts";
import type {Carrier} from "../types/carrier.ts";

const FlightsPage = () => {
  const isLoading = useAppSelector(state => state.flights.isLoading);
  const flights = useAppSelector(state => state.flights.flights);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <Loader className="size-8 text-white animate-spin"/>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden bg-black">
      <div className="flex flex-col mt-5 h-full text-white px-4">
        <FlightSearch/>
      </div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full table-fixed border border-gray-200">
          <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Airline</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Duration</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Departure</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Arrival</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Stops</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Price</th>
          </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
          {flights.map((flight, index) => (
            <tr key={index} className="bg-white even:bg-gray-50 hover:bg-gray-100 transition">

              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <div className="flex flex-wrap items-center gap-2">
                  {flight.legs
                    .flatMap((leg) => leg.carriers)
                    .filter((carrier, idx: number, arr: Carrier[]) =>
                      arr.findIndex(c => c.id === carrier.id) === idx // remove duplicate carriers
                    )
                    .map((carrier: Carrier) => (
                      <div key={carrier.id} className="flex items-center gap-1">
                        <img src={carrier.logoUrl} alt={carrier.name} className="w-5 h-5 object-contain" />
                        <span>{carrier.name}</span>
                      </div>
                    ))
                  }
                </div>
              </td>

              {/* Total Duration */}
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {Math.floor(
                  flight.legs.reduce((acc: number, leg: any) => acc + leg.durationInMinutes, 0) / 60
                )}h{" "}
                {flight.legs.reduce((acc: number, leg: any) => acc + leg.durationInMinutes, 0) % 60}m
              </td>

              {/* Departure */}
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {flight.legs[0]?.origin || "N/A"} <br />
                <span className="text-xs text-gray-500">{flight.legs[0]?.departure || "N/A"}</span>
              </td>

              {/* Arrival */}
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {flight.legs.at(-1)?.destination || "N/A"} <br />
                <span className="text-xs text-gray-500">{flight.legs.at(-1)?.arrival || "N/A"}</span>
              </td>

              {/* Stops */}
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {flight.legs.reduce((acc: number, leg: any) => acc + leg.stopCount, 0)} stop(s)
              </td>

              {/* Price */}
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap font-semibold">
                {flight.price || "N/A"}
              </td>

            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightsPage;