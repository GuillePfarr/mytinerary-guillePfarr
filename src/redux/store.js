import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "./reducers/citiesReducer.js";
import cityDetailsReducer from "../redux/reducers/cityDetailsSlice";
import  userReducer  from "./reducers/userReducer.js";


const store = configureStore({
  reducer: {
citiesReducer : citiesReducer,

userReducer: userReducer,

cityDetails: cityDetailsReducer

}
});

export default store;
