import FlightSearch from "../components/FlightSearch.tsx";
import {useAppSelector} from "../hooks/store/hooks.ts";
import {Loader} from "lucide-react";
import type {Leg} from "../types/leg.ts";
import type {Marketing} from "../types/marketing.ts";
import dayjs from "dayjs";

const FlightsPage = () => {
  const {isLoading, flights} = useAppSelector(state => state.flights);

  const formatDateTime = (dateStr: string): string => {
    if (!dateStr) return "Invalid date";
    return dayjs(dateStr).format("MMM D, YYYY • h:mm A");
  }

  return (
    <div className="h-auto w-full overflow-hidden pb-5">
      <div className="flex flex-col mt-5 h-full text-black px-4">
        <FlightSearch/>

        {isLoading ? (
          <div className="h-screen w-full flex items-center justify-center">
            <Loader className="size-8 text-white animate-spin"/>
          </div>
        ) : flights && flights.length > 0 && (
          <div className="overflow-x-auto rounded-lg shadow bg-white">
            <table className="min-w-full table-fixed border border-gray-200">
              <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Airline</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Duration</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Stops</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Departure</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Arrival</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Price</th>
              </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
              {flights.map((flight, index) => (
                <tr key={index} className="bg-white even:bg-gray-50 hover:bg-gray-100 transition">

                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <div className="flex flex-wrap items-center gap-2">
                      {
                        flight.legs.map((leg: Leg) => (
                          leg.carriers.marketing.map((marketing: Marketing, index: number) => (
                            <div key={marketing.id} className="flex items-center gap-1">
                              <img src={marketing.logoUrl} alt={marketing.name} className="w-12 h-12 object-contain"/>
                              <span>{marketing.name}</span>
                              {index < leg.carriers.marketing.length - 1 &&
                                <span className="px-1 text-gray-400">|</span>}
                            </div>
                          ))
                        ))
                      }
                    </div>
                  </td>

                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {Math.floor(
                      flight.legs.reduce((acc: number, leg: Leg) => acc + leg.durationInMinutes, 0) / 60
                    )}h{" "}
                    {flight.legs.reduce((acc: number, leg: Leg) => acc + leg.durationInMinutes, 0) % 60}m
                  </td>

                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {flight.legs.reduce((acc: number, leg: Leg) => acc + leg.stopCount, 0)} stop(s)
                  </td>

                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {flight.legs[0]?.origin.name || "N/A"} <br/>
                    <span className="text-xs text-gray-500">{formatDateTime(flight.legs[0]?.departure) || "N/A"}</span>
                  </td>

                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {flight.legs[flight.legs.length - 1]?.destination.name || "N/A"} <br/>
                    <span
                      className="text-xs text-gray-500">{formatDateTime(flight.legs[flight.legs.length - 1]?.arrival) || "N/A"}</span>
                  </td>


                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap font-semibold">
                    {flight.price?.formatted || "N/A"}
                  </td>

                </tr>
              ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightsPage;