import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function Vanguard() {
  const [sensors, setSensors] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredSensors, setFilteredSensors] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const handleFilterChange = (event) => {
    const filterText = event.target.value.toLowerCase();

    const filteredSensors = sensors.filter((sensor) =>
      sensor.tempInt1.toString().startsWith(filterText) ||
      sensor.tempInt2.toString().startsWith(filterText)
    );

    setFilter(event.target.value);
    setFilteredSensors(filteredSensors);
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + '/api/vanguards')
      .then((res) => {
        setSensors(res.data.response);
        setFilteredSensors(res.data.response);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setNoResults(filteredSensors.length === 0);
    window.scrollTo(0, 0);
  }, [filteredSensors]);

  return (
    <div className="sensors-container">
      <h1 className='SensorsTitle'>Temperature Sensors</h1>
      <input
        className='inputSensors'
        type="text"
        placeholder="Filter by temperature..."
        value={filter}
        onChange={handleFilterChange}
      />
      {noResults && (
        <h2 className="display-1 fw-bolder">No matches.</h2>
      )}
      <div className="cardsfield">
        {filteredSensors.map((sensor, index) => (
          <div className="card" key={index}>
            <div className="card-body">
              <h5 className="card-title">Temperature Sensor {index + 1}</h5>
              <p>Temperature 1: {sensor.tempInt1} °C</p>
              <p>Temperature 2: {sensor.tempInt2} °C</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vanguard;
