import { configureStore } from "@reduxjs/toolkit";
import { citiesReducer } from "./redux/reducers"; // Importa tu combinación de reducers aquí


const store = configureStore({
  reducer: citiesReducer, // Pasa aquí tus reducers combinados
  // Otras configuraciones de Redux si es necesario
});

export default store;
