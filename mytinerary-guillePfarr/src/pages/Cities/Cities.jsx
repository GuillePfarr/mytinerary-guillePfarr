import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Cities/cities.css';
import axios from 'axios';

function Cities() {
  const [cities, setCities] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);

  const handleFilterChange = (event) => {
    const filterText = event.target.value.toLowerCase();

    const filteredCities = cities.filter((city) =>
      city.name.toLowerCase().startsWith(filterText)
    );

    setFilter(event.target.value);
    setFilteredCities(filteredCities);
  };

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/cities')
      .then((res) => setCities(res.data.response))
      .catch((error) => console.log(error));
  }, []); 

  const seeDetail = (cityId) => {
    
  };

  return (
    <div className="container">
      <h1>Cities</h1>
      <input
        type="text"
        placeholder="Filter by name..."
        value={filter}
        onChange={handleFilterChange}
      />
      <div className="row">
        {filteredCities.map((city) => (
          <div className="cardsfield" key={city.name}>
            <div className="">
              <div className="card-body">
                <h5 className="card-title">{city.name}</h5>
                <img src={city.image} className="card-img-top" alt={city.name} />
                <h5 className="card-country-field">{city.country}</h5>
                <button>
                  <Link to={`/citydetails/${city._id}`} className="btn btn-primary">
                  See more
                </Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cities;


