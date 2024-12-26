
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

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(import.meta.env.VITE_API_URL + '/api/vanguard');
//         const vanguards = response.data.response;
//         const currentTemperatureObj = vanguards.find((vanguard) => vanguard._id === '6609c0e76cfbe770c4735e09');

//         setVanguardData(currentTemperatureObj);

//       } catch (error) {
//         console.error('Error fetching vanguard data:', error);
//       }
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 10000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="vanguard-container">
//       <h1 className='VanguardTitle'>Vanguard Data</h1>

//       {vanguardData && (
//         <div>

//           <div className="card">
//             <div className="card-body">
//               <h5 className="card-title">Current Temperature</h5>
//               <p>Current Temperature: {vanguardData.tempInt1} °C</p>
//               <p>Max Temperature: {vanguardData.tempInt1Max} °C</p>
//               <p>Min Temperature: {vanguardData.tempInt1Min} °C</p>
//               <p>Estado de Error: {vanguardData.errorStatus} </p>
//               <p>Time: {formatTime(vanguardData.date)}</p>
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
  const [parameters, setParameters] = useState({
    tempMin: null,
    tempMax: null,
    humidityMin: null,
    humidityMax: null
  });
  const [editMode, setEditMode] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Fetch data for vanguard and parameters
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/api/vanguard');
        const vanguards = response.data.response;
        const currentTemperatureObj = vanguards.find((vanguard) => vanguard._id === '6609c0e76cfbe770c4735e09');

        setVanguardData(currentTemperatureObj);

        // Fetch parameters data
        const parametersResponse = await axios.get(import.meta.env.VITE_API_URL + '/api/parameters');
        setParameters(parametersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleKeyChange = (e) => {
    setAccessKey(e.target.value);
  };

  const handleAuthorize = () => {
    if (accessKey === 'your-access-key') {
      setIsAuthorized(true);
      setEditMode(true);
    } else {
      alert('Invalid key');
    }
  };

  const handleParameterChange = (e) => {
    const { name, value } = e.target;
    setParameters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(import.meta.env.VITE_API_URL + '/api/parameters', parameters);
      alert('Parameters updated successfully');
      setEditMode(false);
      setIsAuthorized(false);
      setAccessKey('');
    } catch (error) {
      console.error('Error updating parameters:', error);
    }
  };

  // return (
  //   <div className="vanguard-container">
  //     <h1 className='VanguardTitle'>Vanguard Data</h1>

  //     {vanguardData && (
  //       <div className="vanguard-content">
  //         <div className="card">
  //           <div className="card-body">
  //             <h5 className="card-title">Current Temperature</h5>
  //             <p>Current Temperature: {vanguardData.tempInt1} °C</p>
  //             <p>Max Temperature: {vanguardData.tempInt1Max} °C</p>
  //             <p>Min Temperature: {vanguardData.tempInt1Min} °C</p>
  //             <p>Estado de Error: {vanguardData.errorStatus} </p>
  //             <p>Time: {formatTime(vanguardData.date)}</p>
  //           </div>
  //         </div>

  //         <div className="parameters-section">
  //           <h5>Parameters</h5>
  //           <div>
  //             <p>Min Temperature: {parameters.tempMin} °C</p>
  //             <p>Max Temperature: {parameters.tempMax} °C</p>
  //             <p>Min Humidity: {parameters.humidityMin} %</p>
  //             <p>Max Humidity: {parameters.humidityMax} %</p>
  //           </div>

  //           {editMode ? (
  //             <div className="edit-form">
  //               <label>
  //                 Min Temperature:
  //                 <input type="number" name="tempMin" value={parameters.tempMin || ''} onChange={handleParameterChange} />
  //               </label>
  //               <label>
  //                 Max Temperature:
  //                 <input type="number" name="tempMax" value={parameters.tempMax || ''} onChange={handleParameterChange} />
  //               </label>
  //               <label>
  //                 Min Humidity:
  //                 <input type="number" name="humidityMin" value={parameters.humidityMin || ''} onChange={handleParameterChange} />
  //               </label>
  //               <label>
  //                 Max Humidity:
  //                 <input type="number" name="humidityMax" value={parameters.humidityMax || ''} onChange={handleParameterChange} />
  //               </label>
  //               <button onClick={handleSave}>Save</button>
  //             </div>
  //           ) : (
  //             !isAuthorized && (
  //               <div className="access-key">
  //                 <label>
  //                   Access Key:
  //                   <input type="password" value={accessKey} onChange={handleKeyChange} />
  //                 </label>
  //                 <button onClick={handleAuthorize}>Authorize</button>
  //               </div>
  //             )
  //           )}
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );

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

              {editMode ? (
                <div className="edit-form">
                  <label>
                    Min Temperature:
                    <input type="number" name="tempMin" value={parameters.tempMin || ''} onChange={handleParameterChange} />
                  </label>
                  <label>
                    Max Temperature:
                    <input type="number" name="tempMax" value={parameters.tempMax || ''} onChange={handleParameterChange} />
                  </label>
                  <label>
                    Min Humidity:
                    <input type="number" name="humidityMin" value={parameters.humidityMin || ''} onChange={handleParameterChange} />
                  </label>
                  <label>
                    Max Humidity:
                    <input type="number" name="humidityMax" value={parameters.humidityMax || ''} onChange={handleParameterChange} />
                  </label>
                  <button onClick={handleSave}>Save</button>
                </div>
              ) : (
                !isAuthorized && (
                  <div className="access-key">
                    <label>
                      Access Key:
                      <input type="password" value={accessKey} onChange={handleKeyChange} />
                    </label>
                    <button onClick={handleAuthorize}>Authorize</button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vanguard;
