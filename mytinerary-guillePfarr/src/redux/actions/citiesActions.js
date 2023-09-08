import { createAction } from "@reduxjs/toolkit";

export const mostrarCities = createAction('mostrarCities', (city) =>{
return {

payload : city}
})

