
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/api/vanguard');
        const vanguards = response.data.response;
        const currentTemperatureObj = vanguards.find((vanguard) => vanguard._id === '6609c0e76cfbe770c4735e09');

        setVanguardData(currentTemperatureObj);

      } catch (error) {
        console.error('Error fetching vanguard data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="vanguard-container">
      <h1 className='VanguardTitle'>Vanguard Data</h1>

      {vanguardData && (
        <div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Current Temperature</h5>
              <p>Current Temperature: {vanguardData.tempInt1} °C</p>
              <p>Max Temperature: {vanguardData.tempInt1Max} °C</p>
              <p>Min Temperature: {vanguardData.tempInt1Min} °C</p>
              <p>Estado de Error: {vanguardData.errorStatus} </p>
              <p>Time: {formatTime(vanguardData.date)}</p>
            </div>
          </div>


        </div>
      )}
    </div>
  );
}

export default Vanguard;



