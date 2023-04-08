import React, {useEffect, useState} from "react";
import {TextField, Box} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect, useDispatch } from "react-redux";
import { LocationOn } from "@material-ui/icons"
import { GET_SEARCH_RESULT } from "../constants/placesConstants";
import { fetchPlaces } from "../actions/placesActions";

const AutocompleteInput = ({locations, onPlaceSelected, popValue}) => {
  const [value, setValue] = React.useState(null)
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setInputValue(popValue)
  }, [popValue])

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${inputValue}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&callback=handleResponse`;
    document.body.appendChild(script);

    return () => {
      // Clean up the script tag when the component is unmounted
      document.body.removeChild(script);
    };
  }, [inputValue]);

  return (
    <Autocomplete
      style={{width: '94%'}}
      value = { value }
      options={locations}
      getOptionLabel={(option) => option && `${option.name},${option.formatted_address}`}
      onChange = {(event, selectedPlace) => {
        if(!selectedPlace) return null
        setValue(selectedPlace)
        onPlaceSelected(selectedPlace)
        dispatch({type: GET_SEARCH_RESULT, inputValue: selectedPlace})
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        dispatch(fetchPlaces(newInputValue))
      }}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <LocationOn/>
          {`${props.name},${props.formatted_address}`}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a Location"
          margin="normal"
          variant="outlined"
          InputProps={{ ...params.InputProps, type: "search" }}
        />
      )}
    />
  );
};

const mapStateToProps = (state) => {
  return { 
    locations : state.placeReducer.places
  }
}

export default connect(mapStateToProps, null) (AutocompleteInput);
