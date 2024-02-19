// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Vanguard() {
//     const [currentTemperature, setCurrentTemperature] = useState(null);
//     const [minTemperature, setMinTemperature] = useState(null);
//     const [minTemperatureTime, setMinTemperatureTime] = useState(null);
//     const [maxTemperature, setMaxTemperature] = useState(null);
//     const [maxTemperatureTime, setMaxTemperatureTime] = useState(null);
//     const [targetTemperatures, setTargetTemperatures] = useState(null);


//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(import.meta.env.VITE_API_URL + '/api/vanguard');
//                 const vanguards = response.data.response;

//                 // Calcula la temperatura actual (la última registrada)
//                 const latestTemperature = vanguards.length > 0 ? vanguards[0].tempInt1 : null;
//                 setCurrentTemperature(latestTemperature);



//                 // Calcula la temperatura mínima del día
//                 // const minTempEntry = vanguards.reduce((min, entry) => (entry.tempInt1 < min ? entry.tempInt1 : min), Infinity);
//                 // setMinTemperature(minTempEntry);
//                 // setMinTemperatureTime(minTempEntry === Infinity ? null : minTempEntry.createdAt);
//                 // Calcula la temperatura mínima del día
//                 const minTempEntry = vanguards.reduce((min, entry) => (entry.tempInt1 < min.tempInt1 ? entry : min), { tempInt1: Infinity, date: null });
//                 setMinTemperature(minTempEntry.tempInt1);
//                 setMinTemperatureTime(minTempEntry.date);


//                 // Calcula la temperatura máxima del día
//                 const maxTempEntry = vanguards.reduce((max, entry) => (entry.tempInt1 > max ? entry.tempInt1 : max), -Infinity);
//                 setMaxTemperature(maxTempEntry);
//                 setMaxTemperatureTime(maxTempEntry === -Infinity ? null : maxTempEntry.createdAt);

//                 // Obtiene las temperaturas objetivo por ID específico
//                 const targetTempsEntry = vanguards.find((entry) => entry._id === '65b8017e1efb81f1ed066adc');
//                 setTargetTemperatures(targetTempsEntry ? targetTempsEntry : null);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         // Llama a fetchData al montar el componente y cada 30 segundos
//         fetchData();
//         const interval = setInterval(fetchData, 10000);

//         // Limpia el intervalo al desmontar el componente
//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <div className="sensors-container">
//             <h1 className='SensorsTitle'>Temperature Sensors</h1>

//             {/* Tarjeta para la temperatura actual */}
//             <div className="card">
//                 <div className="card-body">
//                     <h5 className="card-title">Current Temperature</h5>
//                     <p>Temperature: {currentTemperature} °C</p>
//                 </div>
//             </div>

//             {/* Tarjeta para la temperatura mínima del día */}
//             <div className="card">
//                 <div className="card-body">
//                     <h5 className="card-title">Min Temperature Today</h5>
//                     {minTemperature !== null ? (
//                         <>
//                             <p>Temperature: {minTemperature} °C</p>
//                             <p>Recorded at: {minTemperatureTime}</p>
//                         </>
//                     ) : (
//                         <p>No data available</p>
//                     )}
//                 </div>
//             </div>

//             {/* Tarjeta para la temperatura máxima del día */}
//             <div className="card">
//                 <div className="card-body">
//                     <h5 className="card-title">Max Temperature Today</h5>
//                     {maxTemperature !== null ? (
//                         <>
//                             <p>Temperature: {maxTemperature} °C</p>
//                             <p>Recorded at: {maxTemperatureTime}</p>
//                         </>
//                     ) : (
//                         <p>No data available</p>
//                     )}
//                 </div>
//             </div>

//             {/* Tarjeta para las temperaturas objetivo */}
//             <div className="card">
//                 <div className="card-body">
//                     <h5 className="card-title">Target Temperatures</h5>
//                     {targetTemperatures !== null ? (
//                         <>
//                             <p>Temperature 1: {targetTemperatures.tempInt1} °C</p>
//                             <p>Temperature 2: {targetTemperatures.tempInt2} °C</p>
//                         </>
//                     ) : (
//                         <p>No data available</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Vanguard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Función para formatear la fecha y hora
// const formatDateTime = (dateTimeString) => {
//   const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
//   const utcDate = new Date(dateTimeString);
//   const localDate = new Date(utcDate.getTime() - (utcDate.getTimezoneOffset() * 60000));
//   return localDate.toLocaleString('en-US', options);
// };
// Función para formatear la fecha y hora
const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "No data available";
    console.log("Invalid date:", dateTimeString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    const localDate = new Date(dateTimeString);
    console.log("Formatted date:", localDate);
    return localDate.toLocaleString('en-US', options);
};

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
                const minTempEntry = vanguards.reduce((min, entry) => (entry.tempInt1 < min.tempInt1 ? entry : min), { tempInt1: Infinity, date: null });
                setMinTemperature(minTempEntry.tempInt1);
                setMinTemperatureTime(minTempEntry.date);

                // Calcula la temperatura máxima del día
                const maxTempEntry = vanguards.reduce((max, entry) => (entry.tempInt1 > max.tempInt1 ? entry : max), { tempInt1: -Infinity, date: null });
                setMaxTemperature(maxTempEntry.tempInt1);
                setMaxTemperatureTime(maxTempEntry.date);



                // Obtiene las temperaturas objetivo por ID específico
                const targetTempsEntry = vanguards.find((entry) => entry._id === '65b8017e1efb81f1ed066adc');
                setTargetTemperatures(targetTempsEntry ? targetTempsEntry : null);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Llama a fetchData al montar el componente y cada 30 segundos
        fetchData();
        const interval = setInterval(fetchData, 10000);

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
                            <p>Recorded at: {formatDateTime(minTemperatureTime)}</p>
                        </>
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
            </div>

            {/* Tarjeta para la temperatura máxima del día */}
            {/* Tarjeta para la temperatura máxima del día */}
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Max Temperature Today</h5>
                    {maxTemperature !== -Infinity ? (
                        <>
                            <p>Temperature: {maxTemperature} °C</p>
                            <p>Recorded at: {formatDateTime(maxTemperatureTime)}</p>
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
