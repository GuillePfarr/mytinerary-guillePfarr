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
    const res = await axios.get('http://localhost:3000/api/cities');
    return res.data.response;
  } catch (error) {
    console.error(error);
    return [];
  }
});
