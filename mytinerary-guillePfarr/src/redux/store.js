import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "./reducers/citiesReducer,js";
import cityDetailsReducer from "../redux/reducers/cityDetailsSlice";


const store = configureStore({
  reducer: {
citiesReducer : citiesReducer,
cityDetails: cityDetailsReducer,

}
});

export default store;
