// import { createAction } from "@reduxjs/toolkit";

//    const mostrarCities = createAction('mostrarCities', (city) =>{
// return {

// payload : city}
// })

// export default mostrarCities;


import { createAction } from "@reduxjs/toolkit";

export const mostrarCities = createAction('mostrarCities', (cities) => {
  return {
    payload: cities
  }
})


export default {mostrarCities}