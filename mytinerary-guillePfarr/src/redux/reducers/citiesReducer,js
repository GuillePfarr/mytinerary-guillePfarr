import { createReducer } from "@reduxjs/toolkit";
import { mostrarCities, getAllCities, setCityFilter } from "../actions/citiesActions";

const initialState = {
  cities: [],
  itineraries: [],
  filter: '',
  filteredCities: [],
};

const citiesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(mostrarCities, (store, action) => {
      
      const city = store.cities.find((city) => city._id === action.payload._id);
      if (!city) {
        store.cities.push(action.payload);
      }
    })
    .addCase(getAllCities.fulfilled, (store, action) => {
     
      const newState = { ...store, cities: action.payload.response, filteredCities: action.payload.response };
      return newState;
    })
    .addCase(setCityFilter, (store, action) => {
      
      const filter = action.payload.toLowerCase();
      const filteredCities = store.cities.filter((city) => city.name.toLowerCase().startsWith(filter));
      return {
        ...store,
        filter,
        filteredCities,
      };
    });
});

export default citiesReducer;
