import {
  Button,
  FormControl, IconButton,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  type SelectChangeEvent,
  Typography
} from "@mui/material";
import React, {useState} from "react";
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import type {FlightSearchParams} from "../types/flightSearchParams.ts";

const FlightSearch = () => {
  const [searchParams, setSearchParams] = useState<FlightSearchParams>({
    trip: "one_way",
    originSkyId: "",
    destinationSkyId: "",
    originEntityId: null,
    destinationEntityId: null,
    date: null,
    cabinClass: "economy",
    adults: 1,
    children: 0,
    infants: 0
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleChange = (event: SelectChangeEvent) => {
    const {name, value} = event.target;
    setSearchParams(prevState => ({...prevState, [name]: value}));
  };

  const [tempPassengers, setTempPassengers] = useState({
    adults: searchParams.adults,
    children: searchParams.children,
    infants: searchParams.infants,
  });

  const handleOpenPopover = (e: React.MouseEvent<HTMLElement>) => {
    // Initialize temp state from actual
    setTempPassengers({
      adults: searchParams.adults,
      children: searchParams.children,
      infants: searchParams.infants,
    });
    setAnchorEl(e.currentTarget);
  };

  const handleDone = () => {
    setSearchParams(prev => ({
      ...prev,
      ...tempPassengers,
    }));
    setAnchorEl(null);
  };

  const updateTempPassenger = (key: keyof typeof tempPassengers, delta: number) => {
    setTempPassengers(prev => {
      const newValue = prev[key] + delta;
      if (key === "adults" && newValue < 1) return prev;
      if ((key === "children" || key === "infants") && newValue < 0) return prev;
      return {...prev, [key]: newValue};
    });
  };

  const totalPassengers = searchParams.adults + searchParams.children + searchParams.infants;


  const open = Boolean(anchorEl);
  const id = open ? "passenger-popover" : undefined;

  return (
    <div className="bg-white p-4 rounded-2xl text-white shadow-md">
      <div className="flex gap-4 items-center justify-center mb-4">
        <FormControl variant="standard" className="m-1 md:w-30">
          <InputLabel id="trip">Trip Type</InputLabel>
          <Select
            name="trip"
            labelId="trip-select-label"
            id="trip-select"
            value={searchParams.trip}
            onChange={handleChange}
            label="trip"
          >
            <MenuItem value={"one_way"}>One Way</MenuItem>
            <MenuItem value={"round_trip"}>Round Trip</MenuItem>
            <MenuItem value={"multi_city"}>Multi City</MenuItem>
          </Select>
        </FormControl>

        <Button
          onClick={handleOpenPopover}
          variant="outlined"
          size="small"
          className="top-1.5"
        >
          <PersonIcon className="mr-1"/>
          <span className="text-xl">{totalPassengers}</span>
        </Button>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{vertical: "bottom", horizontal: "left"}}
        >
          <div className="bg-zinc-800 text-white p-4 w-65">
            {([
              {key: "adults", label: "Adults", description: ""},
              {key: "children", label: "Children", description: "Aged 2–11"},
              {key: "infants", label: "Infants", description: "Under 2"},
            ] as const).map(({key, label, description}) => (
              <div key={key} className="flex justify-between items-center py-2">
                <div>
                  <Typography>{label}</Typography>
                  {description && (
                    <Typography className="text-xs text-gray-400">
                      {description}
                    </Typography>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <IconButton
                    onClick={() => updateTempPassenger(key, -1)}
                    disabled={key === "adults" ? tempPassengers.adults <= 1 : tempPassengers[key] <= 0}
                  >
                    <RemoveIcon className="text-blue-600"/>
                  </IconButton>
                  <Typography>{tempPassengers[key]}</Typography>
                  <IconButton
                    onClick={() => updateTempPassenger(key, 1)}
                    disabled={tempPassengers[key] >= 9}
                  >
                    <AddIcon className="text-blue-600"/>
                  </IconButton>
                </div>
              </div>
            ))}

            {(tempPassengers.adults + tempPassengers.children + tempPassengers.infants) > 9 ? (
              <div className="flex">
                <ErrorOutlineIcon className="text-red-500 mt-2" />
                <Typography className="text-red-500 text-sm pt-2 pl-2">
                  Only 9 passengers allowed
                </Typography>
              </div>
            ) : tempPassengers.infants > tempPassengers.adults ? (
              <div className="flex">
                <ErrorOutlineIcon className="text-red-500 mt-2" />
                <Typography className="text-red-500 text-sm pt-2 pl-2">
                  There must be at least one adult for every infant
                </Typography>
              </div>
            ) : (
              <div className="flex justify-between mt-4">
                <Button onClick={() => setAnchorEl(null)} color="inherit">
                  Cancel
                </Button>
                <Button onClick={handleDone} variant="contained">
                  Done
                </Button>
              </div>
            )}
          </div>
        </Popover>

        <FormControl variant="standard" className="m-1 md:w-30">
          <InputLabel id="class">Class</InputLabel>
          <Select
            name="class"
            labelId="class-label"
            id="class-select"
            value={searchParams.cabinClass}
            onChange={handleChange}
            label="class"
          >
            <MenuItem value={"economy"}>Economy</MenuItem>
            <MenuItem value={"premium_economy"}>Premium Economy</MenuItem>
            <MenuItem value={"business"}>Business</MenuItem>
            <MenuItem value={"first"}>First</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default FlightSearch;