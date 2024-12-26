import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./vanguard.css";

const formatTime = (dateTimeString) => {
  if (!dateTimeString) return "No data available";

  const options = { hour: '2-digit', minute: '2-digit' };
  const localDate = new Date(dateTimeString);

  return localDate.toLocaleString('en-US', options);
};

function Vanguard() {
  const [vanguardData, setVanguardData] = useState(null);
  const [parameters, setParameters] = useState({
    tempMin: null,
    tempMax: null,
    humidityMin: null,
    humidityMax: null
  });

  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
        
  //       const vanguardResponse = await axios.get(import.meta.env.VITE_API_URL + '/api/vanguard');
  //       const vanguards = vanguardResponse.data.response;
  //       const currentTemperatureObj = vanguards.find((vanguard) => vanguard._id === '6609c0e76cfbe770c4735e09');
  //       setVanguardData(currentTemperatureObj);

  //       const parameterResponse = await axios.get(import.meta.env.VITE_API_URL + '/api/parameter');
  //       const parameters = parameterResponse.data.response;
  //       const parametersObj = parameters.find((parameter) => parameter._id === '676d6f02d6ae0a6ca083bee6'); 
  //       setParameterData(parametersObj)
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  //   const interval = setInterval(fetchData, 10000); 

  //   return () => clearInterval(interval);
  // }, []);


// useEffect(() => {
//   const fetchData = async () => {
//     try {
      
//       const vanguardResponse = await axios.get(import.meta.env.VITE_API_URL + '/api/vanguard');
//       const vanguards = vanguardResponse.data.response;
//       const currentTemperatureObj = vanguards.find((vanguard) => vanguard._id === '6609c0e76cfbe770c4735e09');
//       setVanguardData(currentTemperatureObj);

    
//       const parameterId = '676d6f02d6ae0a6ca083bee6'; 
//       const parameterResponse = await axios.get(import.meta.env.VITE_API_URL + `/api/parameter/${parameterId}`);
//       const parameterObj = parameterResponse.data.response;

      
//       if (parameterObj) {
//         setParameterData(parameterObj);
//       } else {
//         console.error('Parameter with the given ID not found.');
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };


// useEffect(() => {
//   const fetchData = async () => {
//     try {
      // Fetch vanguard data
      // const vanguardResponse = await axios.get(import.meta.env.VITE_API_URL + '/api/vanguard');
      // const vanguards = vanguardResponse.data.response;
      // const currentTemperatureObj = vanguards.find((vanguard) => vanguard._id === '6609c0e76cfbe770c4735e09');
      // setVanguardData(currentTemperatureObj);

      // Fetch a specific parameter using the ID in the URL
      // const parameterId = '676d6f02d6ae0a6ca083bee6'; 
      // const parameterResponse = await axios.get(import.meta.env.VITE_API_URL + `/api/parameter/${parameterId}`);
      // const parameterObj = parameterResponse.data.response;
      // const parameterResponse = await axios.get(import.meta.env.VITE_API_URL + '/api/parameter');
      // const parameters = parameterResponse.data.response;
      // const currentValuesObj = parameters.find((parameter) => parameter._id === '676d6f02d6ae0a6ca083bee6');
      // setParameterData(currentValuesObj);
      // Log the parameter data to the console to inspect it
      

      // Set the parameter data
//       if (valuesObj) {
//         setParameterData(valuesObj);
//       } else {
//         console.error('Parameter with the given ID not found.');
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };




//   fetchData();
//   const interval = setInterval(fetchData, 10000); 

//   return () => clearInterval(interval);
// }, []);

useEffect(() => {
  const fetchData = async () => {
    try {


      const parameterResponse = await axios.get(import.meta.env.VITE_API_URL + '/api/parameter');
      const parameters = parameterResponse.data.response;
      const currentValuesObj = parameters.find((parameter) => parameter._id === '676d6f02d6ae0a6ca083bee6');
      setParameters(currentValuesObj); 



      const vanguardResponse = await axios.get(import.meta.env.VITE_API_URL + '/api/vanguard');
      const vanguards = vanguardResponse.data.response;
      const currentTemperatureObj = vanguards.find((vanguard) => vanguard._id === '6609c0e76cfbe770c4735e09');
      setVanguardData(currentTemperatureObj);

      
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);


  return (
    <div className="vanguard-container">
      <h1 className="VanguardTitle">Vanguard Data</h1>

      {vanguardData && (
        <div className="vanguard-content">
          {/* Tarjeta de datos actuales */}
          <div className="card data-card">
            <div className="card-body">
              <h5 className="card-title">Current Data</h5>
              <p>Current Temperature: {vanguardData.tempInt1} °C</p>
              <p>Max Temperature: {vanguardData.tempInt1Max} °C</p>
              <p>Min Temperature: {vanguardData.tempInt1Min} °C</p>
              <p>Estado de Error: {vanguardData.errorStatus}</p>
              <p>Time: {formatTime(vanguardData.date)}</p>
            </div>
          </div>

          {/* Tarjeta de parámetros */}
          <div className="card parameters-card">
            <div className="card-body">
              <h5 className="card-title">Parameters</h5>
              <div>
                <p>Min Temperature: {parameters.tempMin} °C</p>
                <p>Max Temperature: {parameters.tempMax} °C</p>
                <p>Min Humidity: {parameters.humidityMin} %</p>
                <p>Max Humidity: {parameters.humidityMax} %</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vanguard;
