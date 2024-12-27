// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "./vanguard.css";

// const formatTime = (dateTimeString) => {
//   if (!dateTimeString) return "No data available";

//   const options = { hour: '2-digit', minute: '2-digit' };
//   const localDate = new Date(dateTimeString);

//   return localDate.toLocaleString('en-US', options);
// };

// function Vanguard() {
//   const [vanguardData, setVanguardData] = useState(null);
//   const [, setParameters] = useState({
//     tempMin: null,
//     tempMax: null,
//     humidityMin: null,
//     humidityMax: null
//   });



// useEffect(() => {
//   const fetchData = async () => {
//     try {
     
//       const vanguardResponse = await axios.get(import.meta.env.VITE_API_URL + '/api/vanguard');
//       const vanguards = vanguardResponse.data.response;
//       console.log('Datos de Parameters:', vanguardData);
//       const currentTemperatureObj = vanguards.find((vanguard) => vanguard._id === '6609c0e76cfbe770c4735e09');
//       setVanguardData(currentTemperatureObj);

    
     
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   fetchData();
// }, []);


//   return (
//     <div className="vanguard-container">
//       <h1 className="VanguardTitle">Vanguard Data</h1>

//       {vanguardData && (
//         <div className="vanguard-content">
         
//           <div className="card data-card">
//             <div className="card-body">
//               <h5 className="card-title">Current Data</h5>
//               <p>Current Temperature: {vanguardData.tempInt1} °C</p>
//               <p>Max Temperature: {vanguardData.tempInt1Max} °C</p>
//               <p>Min Temperature: {vanguardData.tempInt1Min} °C</p>
//               <p>Estado de Error: {vanguardData.errorStatus}</p>
//               <p>Time: {formatTime(vanguardData.date)}</p>
//             </div>
//           </div>

        
//           <div className="card parameters-card">
//             <div className="card-body">
//               <h5 className="card-title">Parameters</h5>
//               <div>
//                 <p>Min Temperature: {parameters.tempMin} °C</p>
//                 <p>Max Temperature: {parameters.tempMax} °C</p>
//                 <p>Min Humidity: {parameters.humidityMin} %</p>
//                 <p>Max Humidity: {parameters.humidityMax} %</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Vanguard;


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
  const [ajustesData, setAjustesData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch vanguard data
        const vanguardResponse = await axios.get(import.meta.env.VITE_API_URL + '/api/vanguard');
        const vanguards = vanguardResponse.data.response;
        const currentTemperatureObj = vanguards.find((vanguard) => vanguard._id === '6609c0e76cfbe770c4735e09');
        setVanguardData(currentTemperatureObj);

        // Fetch ajustes data
        const ajustesResponse = await axios.get('https://mytinerary-2s20.onrender.com/api/ajuste/676e68bcce18f424bfd35d5a');
        setAjustesData(ajustesResponse.data); // Guardamos los datos de ajustes
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
        </div>
      )}

      {ajustesData && (
        <div className="vanguard-content">
          {/* Tarjeta de ajustes */}
          <div className="card ajustes-card">
            <div className="card-body">
              <h5 className="card-title">Ajustes</h5>
              <p>Min Temperature: {ajustesData.tempMin} °C</p>
              <p>Max Temperature: {ajustesData.tempMax} °C</p>
              <p>Min Humidity: {ajustesData.humidyMin} %</p>
              <p>Max Humidity: {ajustesData.humidyMax} %</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vanguard;
