import React, { useState, useEffect } from 'react';
import axios from 'axios';


const formatDateTime = (dateTimeString) => {
    console.log("Raw date:", dateTimeString);
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
    const [temperatureHistory, setTemperatureHistory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + '/api/vanguard');
                const vanguards = response.data.response;
                console.log(vanguards);

                console.log("Length of vanguards:", vanguards.length);
                // Obtén la última entrada de temperatura
                const latestTemperature = vanguards.length > 0 ? vanguards[0].tempInt1 : null;


                setCurrentTemperature(latestTemperature);



  // Agregar la temperatura actual al historial
        setTemperatureHistory(prevHistory => [
          ...prevHistory,
          { temp: latestTemperature, date: new Date() }
        ]);

        // Ordenar el historial por temperatura en orden ascendente
        const orderedEntries = [...temperatureHistory, { temp: latestTemperature, date: new Date() }]
          .sort((a, b) => a.temp - b.temp);


console.log("Temperature History:", temperatureHistory);

                // Actualiza la temperatura mínima si la última entrada es menor
                if (latestTemperature < minTemperature || minTemperature === null) {
                    setMinTemperature(latestTemperature);
                    setMinTemperatureTime(formatDateTime(new Date()));
                }

                // Actualiza la temperatura máxima si la última entrada es mayor
                if (latestTemperature > maxTemperature || maxTemperature === null) {
                    setMaxTemperature(latestTemperature);
                    setMaxTemperatureTime(formatDateTime(new Date()));
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
                    <p>Temperature: {currentTemperature} °C</p>
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

