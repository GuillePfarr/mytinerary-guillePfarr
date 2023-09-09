import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux";
import store from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <App />
  </Provider>
);
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import './index.css';
// import { Provider } from 'react-redux';
// import { Store } from '@reduxjs/toolkit';

// ReactDOM.render(
//   <Provider Store={Store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')

