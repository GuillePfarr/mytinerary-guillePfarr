import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const setCityFilter = createAction('setCityFilter');
export const mostrarCities = createAction('mostrarCities', (cities) => {
  return {
    payload: cities
  }
});

export const getAllCities = createAsyncThunk('getAllCities', async () => {
  try {
    const res = await axios.get(import.meta.env.VITE_API_URL + '/api/cities');
    return res.data.response;
  } catch (error) {
    console.error(error);
    return [];
  }
});
