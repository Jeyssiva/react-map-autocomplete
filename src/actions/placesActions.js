import { FETCH_PLACES_SUCCESS, FETCH_PLACES_FAILURE } from "../constants/placesConstants";

export const fetchPlaces = (query) => async (dispatch) => {
  try {
    // await fetch('locations.json')
    // await fetch(proxyUrl + apiUrl)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     dispatch({ type: FETCH_PLACES_SUCCESS, payload: data.results });
    //   });
    const googleURL = process.env.NODE_ENV === 'development' ? '/api/place/textsearch/' :
    `${process.env.REACT_APP_GOOGLE_MAP_URL}/api/place/textsearch`
    console.log(googleURL)
     await fetch(`${googleURL}/json?query=${query}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
      {
      method: "GET",
      headers: {
        'Access-Control-Allow-Origin' : "*",
        'Content-Type': 'application/json',
        mode: 'cors'
      }})
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: FETCH_PLACES_SUCCESS, payload: data.results });
      });
  } catch (error) {
    dispatch({ type: FETCH_PLACES_FAILURE, payload: error });
  }
};

