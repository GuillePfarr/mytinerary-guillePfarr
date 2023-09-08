import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "./reducers/citiesReducers";

const store = configureStore( {
reducer: {
citiesReducer : citiesReducer
}

})

export default store