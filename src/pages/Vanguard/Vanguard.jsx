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

  // Fetch data for vanguard and parameters
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch vanguard data
        const vanguardResponse = await axios.get(import.meta.env.VITE_API_URL + '/api/vanguard');
        const vanguards = vanguardResponse.data.response;
        const currentTemperatureObj = vanguards.find((vanguard) => vanguard._id === '6609c0e76cfbe770c4735e09');
        setVanguardData(currentTemperatureObj);

        // Fetch parameters data (same as above, we use the same logic)
        const parametersResponse = await axios.get(import.meta.env.VITE_API_URL + '/api/parameters');
        setParameters(parametersResponse.data.response); // Se espera que sea un objeto con los parámetros
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Fetch data every 10 seconds

    return () => clearInterval(interval);
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
