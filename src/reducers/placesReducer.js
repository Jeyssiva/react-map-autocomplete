import { FETCH_PLACES_SUCCESS, FETCH_PLACES_FAILURE, GET_SEARCH_RESULT } from "../constants/placesConstants";

const initialState = {
  places: [],
  categories:[],
  searchResults: []
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLACES_SUCCESS:
      return { ...state, places: action.payload, };
    case FETCH_PLACES_FAILURE:
      return { ...state, places: [], categories: [] };
    case GET_SEARCH_RESULT:
      return { ...state, searchResults : [...state.searchResults, action.inputValue.name]}
    default:
      return state;
  }
};

export default placesReducer;
