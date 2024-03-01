// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const formatDateTime = (dateTimeString) => {
//   if (!dateTimeString) return "No data available";

//   const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
//   const localDate = new Date(dateTimeString);

//   return localDate.toLocaleString('en-US', options);
// };

// function Vanguard() {
//   const [currentTemperature, setCurrentTemperature] = useState(null);
//   const [minTemperature, setMinTemperature] = useState(null);
//   const [minTemperatureTime, setMinTemperatureTime] = useState(null);
//   const [maxTemperature, setMaxTemperature] = useState(null);
//   const [maxTemperatureTime, setMaxTemperatureTime] = useState(null);
//   const [targetTemperatures, setTargetTemperatures] = useState(null);
//   const [temperatureHistory, setTemperatureHistory] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(import.meta.env.VITE_API_URL + '/api/vanguard');
//         const vanguards = response.data.response;

//         const latestTemperature = vanguards.length > 0 ? { temp: vanguards[0].tempInt1, date: vanguards[0].date } : null;

//         setTemperatureHistory(prevHistory => {
//           const filteredHistory = prevHistory.filter(entry => entry.temp !== latestTemperature.temp);
//           const newHistory = [...filteredHistory, { temp: latestTemperature.temp, date: latestTemperature.date }];
//           return newHistory.sort((a, b) => a.temp - b.temp);
//         });

//         console.log("Ordered Temperatures:", temperatureHistory);

//         setCurrentTemperature(latestTemperature);

//         if (latestTemperature && (latestTemperature.temp < minTemperature || minTemperature === null)) {
//           setMinTemperature(latestTemperature.temp);
//           setMinTemperatureTime(formatDateTime(latestTemperature.date));
//         }

//         if (latestTemperature && (latestTemperature.temp > maxTemperature || maxTemperature === null)) {
//           setMaxTemperature(latestTemperature.temp);
//           setMaxTemperatureTime(formatDateTime(latestTemperature.date));
//         }

//         const targetTempsEntry = vanguards.find((entry) => entry._id === '65b8017e1efb81f1ed066adc');
//         setTargetTemperatures(targetTempsEntry ? targetTempsEntry : null);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 10000);

//     return () => clearInterval(interval);
//   }, [temperatureHistory]);

//   return (
//     <div className="sensors-container">
//       <h1 className='SensorsTitle'>Temperature Sensors</h1>

//       <div className="card">
//         <div className="card-body">
//           <h5 className="card-title">Current Temperature</h5>
//           <p>Temperature: {currentTemperature ? currentTemperature.temp : "No data available"} °C</p>
//         </div>
//       </div>

//       <div className="card">
//         <div className="card-body">
//           <h5 className="card-title">Min Temperature Today</h5>
//           {minTemperature !== null ? (
//             <>
//               <p>Temperature: {minTemperature} °C</p>
//               <p>Recorded at: {formatDateTime(minTemperatureTime)}</p>
//             </>
//           ) : (
//             <p>No data available</p>
//           )}
//         </div>
//       </div>

//       <div className="card">
//         <div className="card-body">
//           <h5 className="card-title">Max Temperature Today</h5>
//           {maxTemperature !== null ? (
//             <>
//               <p>Temperature: {maxTemperature} °C</p>
//               <p>Recorded at: {formatDateTime(maxTemperatureTime)}</p>
//             </>
//           ) : (
//             <p>No data available</p>
//           )}
//         </div>
//       </div>

//       <div className="card">
//         <div className="card-body">
//           <h5 className="card-title">Target Temperatures</h5>
//           {targetTemperatures !== null ? (
//             <>
//               <p>Temperature 1: {targetTemperatures.tempInt1} °C</p>
//               <p>Temperature 2: {targetTemperatures.tempInt2} °C</p>
//             </>
//           ) : (
//             <p>No data available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Vanguard;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return "No data available";

  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
  const localDate = new Date(dateTimeString);

  return localDate.toLocaleString('en-US', options);
};

function Vanguard() {
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [minTemperature, setMinTemperature] = useState(null);
  const [minTemperatureTime, setMinTemperatureTime] = useState(null);
  const [maxTemperature, setMaxTemperature] = useState(null);
  const [maxTemperatureTime, setMaxTemperatureTime] = useState(null);
  const [targetTemperatures, setTargetTemperatures] = useState(null);
  const [temperatureHistory, setTemperatureHistory] = useState([]);

  useEffect(() => {
    // Recuperar el historial desde localStorage al cargar la página
    const storedHistory = localStorage.getItem('temperatureHistory');
    if (storedHistory) {
      const parsedHistory = JSON.parse(storedHistory);
      setTemperatureHistory(parsedHistory);
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/api/vanguard');
        const vanguards = response.data.response;

        const latestTemperature = vanguards.length > 0 ? { temp: vanguards[0].tempInt1, date: vanguards[0].date } : null;

        setTemperatureHistory(prevHistory => {
          const filteredHistory = prevHistory.filter(entry => entry.temp !== latestTemperature.temp);
          const newHistory = [...filteredHistory, { temp: latestTemperature.temp, date: latestTemperature.date }];
          const sortedHistory = newHistory.sort((a, b) => a.temp - b.temp);

          // Guardar en localStorage
          localStorage.setItem('temperatureHistory', JSON.stringify(sortedHistory));

          return sortedHistory;
        });

        console.log("Ordered Temperatures:", temperatureHistory);

        setCurrentTemperature(latestTemperature);

        if (latestTemperature && (latestTemperature.temp < minTemperature || minTemperature === null)) {
          setMinTemperature(latestTemperature.temp);
          setMinTemperatureTime(formatDateTime(latestTemperature.date));
        }

        if (latestTemperature && (latestTemperature.temp > maxTemperature || maxTemperature === null)) {
          setMaxTemperature(latestTemperature.temp);
          setMaxTemperatureTime(formatDateTime(latestTemperature.date));
        }

        const targetTempsEntry = vanguards.find((entry) => entry._id === '65b8017e1efb81f1ed066adc');
        setTargetTemperatures(targetTempsEntry ? targetTempsEntry : null);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sensors-container">
      <h1 className='SensorsTitle'>Temperature Sensors</h1>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Current Temperature</h5>
          <p>Temperature: {currentTemperature ? currentTemperature.temp : "No data available"} °C</p>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Min Temperature Today</h5>
          {minTemperature !== null ? (
            <>
              <p>Temperature: {minTemperature} °C</p>
              <p>Recorded at: {formatDateTime(minTemperatureTime)}</p>
            </>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Max Temperature Today</h5>
          {maxTemperature !== null ? (
            <>
              <p>Temperature: {maxTemperature} °C</p>
              <p>Recorded at: {formatDateTime(maxTemperatureTime)}</p>
            </>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>

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
