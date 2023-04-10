import { FETCH_PLACES_SUCCESS, FETCH_PLACES_FAILURE } from "../constants/placesConstants";

export const fetchPlaces = () => async (dispatch) => {
  try {
     const response = await fetch('locations.json')
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: FETCH_PLACES_SUCCESS, payload: data.results });
      });
   
  } catch (error) {
    dispatch({ type: FETCH_PLACES_FAILURE, payload: error });
  }
};

