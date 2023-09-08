import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const citiesActions = citiesActions
export const mostrarCities = createAction('mostrarCities', (cities) => {
  return {
    payload: cities
  }
});

export const filtrarCities = createAction('filtrarCities', (filtro) => {
  return {
    payload: filtro
  }
});

export const getAllCities = createAsyncThunk('getAllCities', async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/cities');
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
});
export default citiesActions