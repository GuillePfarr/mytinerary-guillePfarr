import { createReducer } from "@reduxjs/toolkit";

import { mostrarCities } from "../actions/citiesActions";

const initialState = {
    cities: [],
    itineraries: [],
}

const citiesReducer = createReducer(initialState, (builder) => {
    builder.addCase(mostrarCities, (store, action) => {
        const city = store.cities.find(city => city._id == action.payload._id)
        const newCities = [...store.cities]
        return {
            ...store,
            cities: [...store.cities, action.payload]
        }
    }

    )

}


)

export default citiesReducer;