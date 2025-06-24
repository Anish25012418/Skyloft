import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import axios from "axios";

type Airport = {
  skyId: string;
  entityId: string;
  presentation: {
    suggestionTitle: string;
    title: string;
    subtitle: string;
  };
};

interface Props {
  label: string;
  onSelect: (airport: Airport | null) => void;
}

const SearchAirportAutocomplete  = ({ label, onSelect }: Props) =>  {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAirports = async (query: string) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/airports?query=${query}`);
      if (res.data?.status) {
        setOptions(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useMemo(() => debounce(fetchAirports, 400), []);
  useEffect(() => {
    if (inputValue.length >= 2) debouncedFetch(inputValue);
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
