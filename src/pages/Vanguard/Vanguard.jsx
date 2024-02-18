import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Vanguard() {
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [minTemperature, setMinTemperature] = useState(null);
  const [minTemperatureTime, setMinTemperatureTime] = useState(null);
  const [maxTemperature, setMaxTemperature] = useState(null);
  const [maxTemperatureTime, setMaxTemperatureTime] = useState(null);
  const [targetTemperatures, setTargetTemperatures] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/api/vanguard');
        const vanguards = response.data.response;

        // Calcula la temperatura actual (la última registrada)
        const latestTemperature = vanguards.length > 0 ? vanguards[0].tempInt1 : null;
        setCurrentTemperature(latestTemperature);

        // Calcula la temperatura mínima del día
        const minTempEntry = vanguards.reduce((min, entry) => {
          if (entry.tempInt1 < min.temp || min.temp === null) {
            return { temp: entry.tempInt1, time: entry.createdAt };
          }
          return min;
        }, { temp: null, time: null });

        setMinTemperature(minTempEntry.temp);
        setMinTemperatureTime(minTempEntry.time);

        // Calcula la temperatura máxima del día
        const maxTempEntry = vanguards.reduce((max, entry) => {
          if (entry.tempInt1 > max.temp || max.temp === null) {
            return { temp: entry.tempInt1, time: entry.createdAt };
          }
          return max;
        }, { temp: null, time: null });

        setMaxTemperature(maxTempEntry.temp);
        setMaxTemperatureTime(maxTempEntry.time);

        // Obtiene las temperaturas objetivo por ID específico
        const targetTempsEntry = vanguards.find((entry) => entry._id === '65b8017e1efb81f1ed066adc');
        setTargetTemperatures(targetTempsEntry ? targetTempsEntry : null);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Llama a fetchData al montar el componente y cada 30 segundos
    fetchData();
    const interval = setInterval(fetchData, 30000);

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sensors-container">
      <h1 className='SensorsTitle'>Temperature Sensors</h1>

      {/* Tarjeta para la temperatura actual */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Current Temperature</h5>
          <p>Temperature: {currentTemperature} °C</p>
        </div>
      </div>

      {/* Tarjeta para la temperatura mínima del día */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Min Temperature Today</h5>
          {minTemperature !== null ? (
            <>
              <p>Temperature: {minTemperature} °C</p>
              <p>Recorded at: {new Date(minTemperatureTime).toLocaleString()}</p>
            </>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>

      {/* Tarjeta para la temperatura máxima del día */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Max Temperature Today</h5>
          {maxTemperature !== null ? (
            <>
              <p>Temperature: {maxTemperature} °C</p>
              <p>Recorded at: {new Date(maxTemperatureTime).toLocaleString()}</p>
            </>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>

      {/* Tarjeta para las temperaturas objetivo */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Target Temperatures</h5>
          {targetTemperatures !== null ? (
            <>
              <p>Temperature 1: {targetTemperatures.tempInt1} °C</p>
              <p>Temperature 2: {targetTemperatures.tempInt2} °C</p>
            </>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Vanguard;
