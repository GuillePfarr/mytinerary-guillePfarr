import { createAction } from "@reduxjs/toolkit";

   const mostrarCities = createAction('mostrarCities', (city) =>{
return {

payload : city}
})

export default mostrarCities
