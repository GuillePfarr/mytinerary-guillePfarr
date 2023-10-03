import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  city: {},
  itineraries: [],
  accordionOpen: {}, 
};  

export const fetchCityDetails = createAsyncThunk(
  'cityDetails/fetchCityDetails',
  async (id) => {
    try {
      const res = await axios.get(`https://mytinerary-2s20.onrender.com/api/cities/${id}`);
      return res.data.response;
    } catch (error) {
      console.error(error);
      return {};
    }
  }
);

export const fetchCityItineraries = createAsyncThunk(
  'cityDetails/fetchCityItineraries',
  async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/itineraries/bycity/${id}`);
      return res.data.response;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
);

const cityDetailsSlice = createSlice({
  name: 'cityDetails',
  initialState,
  reducers: {
   
    toggleAccordion: (state, action) => {
      const itineraryId = action.payload;
      state.accordionOpen[itineraryId] = !state.accordionOpen[itineraryId];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityDetails.fulfilled, (state, action) => {
        state.city = action.payload;
      })
      .addCase(fetchCityItineraries.fulfilled, (state, action) => {
        state.itineraries = action.payload;
      });
  },
});

export const { toggleAccordion } = cityDetailsSlice.actions;

export default cityDetailsSlice.reducer;
