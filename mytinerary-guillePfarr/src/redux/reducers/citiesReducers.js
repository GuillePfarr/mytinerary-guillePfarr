import { createReducer } from "@reduxjs/toolkit";
import { mostrarCities, getAllCities, filtrarCities } from "../actions/citiesActions";

const initialState = {
  cities: [],
  itineraries: [],
  filter: '',
  filteredCities: [],
};

const citiesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(mostrarCities, (store, action) => {
      const city = store.cities.find(city => city._id === action.payload._id);
      const newCities = [...store.cities];
      return {
        ...store,
        cities: [...newCities, action.payload],
      };
    })
    .addCase(getAllCities.fulfilled, (state, action) => {
      const newState = { ...state, cities: action.payload.response, filteredCities: action.payload.response };
      return newState;
    })
    .addCase(filtrarCities, (state, action) => {
      const filter = action.payload.toLowerCase();
      const filteredCities = state.cities.filter(city => city.name.toLowerCase().startsWith(filter));
      return {
        ...state,
        filter,
        filteredCities,
      };
    });
});

export default citiesReducer;
