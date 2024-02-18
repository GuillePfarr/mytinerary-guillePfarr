import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Vanguard() {
  const [vanguards, setVanguards] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + '/api/vanguard')
      .then((res) => {
        setVanguards(res.data.response);
      })
      .catch((error) => console.log(error));
  }, []);




 useEffect(() => {
    fetchData(); // Llamada inicial al montar el componente

    const intervalId = setInterval(() => {
      fetchData(); // Llamada adicional cada 30 segundos
    }, 30000);

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, []);

  useEffect(() => {
    setNoResults(vanguards.length === 0);
    window.scrollTo(0, 0);
  }, [vanguards]);

  return (
    <div className="sensors-container">
      <h1 className='SensorsTitle'>Temperature Sensors</h1>
      {noResults && (
        <h2 className="display-1 fw-bolder">No matches.</h2>
      )}
      <div className="cardsfield">
        {vanguards.map((vanguard) => (
          <div className="card" key={vanguard._id}>
            <div className="card-body">
              <h5 className="card-title">Temperature Sensor {vanguard._id}</h5>
              <p>Temperature 1: {vanguard.tempInt1} °C</p>
              {vanguard.tempInt2 && <p>Temperature 2: {vanguard.tempInt2} °C</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vanguard;
