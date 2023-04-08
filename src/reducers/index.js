import { combineReducers } from "redux";
import placesReducer from "./placesReducer";

const rootReducer = combineReducers({
  placeReducer: placesReducer,
});

export default rootReducer;
