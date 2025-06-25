import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import {useState, useEffect, useMemo, type ReactNode} from "react";
import debounce from "lodash.debounce";
import {searchAirports} from "../../services/flightService.ts";
import type { Airport } from "../../types/searchAirport.ts";

interface Props {
  label: ReactNode;
  onSelect: (airport: Airport | null) => void;
}

const SearchAirportAutocomplete  = ({ label, onSelect }: Props) =>  {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAirports = async (query: string) => {
    setLoading(true);
    try {
      const data = await searchAirports(query);
      if (data?.status && Array.isArray(data.data)) {
        setOptions(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useMemo(() => debounce(fetchAirports, 400), []);
  useEffect(() => {
    if (inputValue.length >= 0) debouncedFetch(inputValue);
    else setOptions([]);
    return () => debouncedFetch.cancel();
  }, [debouncedFetch, inputValue]);

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) =>
        option.presentation?.suggestionTitle || option.presentation?.title || ""
      }
      onInputChange={(_, value) => setInputValue(value)}
      onChange={(_, value) => onSelect(value)}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
    />
  );
}

export default SearchAirportAutocomplete;
