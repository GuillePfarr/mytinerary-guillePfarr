import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "./reducers/citiesReducer,js";



const store = configureStore({
  reducer: {
citiesReducer : citiesReducer
}
});

export default store;
