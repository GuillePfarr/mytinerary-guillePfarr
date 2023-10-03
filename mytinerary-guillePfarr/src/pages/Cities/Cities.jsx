import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Cities/cities.css';
import axios from 'axios';

function Cities() {
  const [cities, setCities] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const handleFilterChange = (city) => {
    const filterText = city.target.value.toLowerCase();

    const filteredCities = cities.filter((city) =>
      city.name.toLowerCase().startsWith(filterText)
    );

    setFilter(city.target.value);
    setFilteredCities(filteredCities);
  };

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/cities')
      .then((res) => {
        setCities(res.data.response);
        setFilteredCities(res.data.response);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setNoResults(filteredCities.length === 0);

    
    window.scrollTo(0, 0);
  }, [filteredCities]);

  return (
    <div className="cities-container">
      <h1 className='CitiesTitle'>Cities</h1>
      <input
        className='inputCities'
        type="text"
        placeholder="Filter by name..."
        value={filter}
        onChange={handleFilterChange}
      />
      {noResults && (
        <h2 className="display-1 fw-bolder">No matches.</h2>
      )}
      <div className="cardsfield">
        {filteredCities.map((city) => (
          <div className="card" key={city.name}>
            <div className="card-body">
              <h5 className="card-title">{city.name}</h5>
              <img src={city.image} className="card-img-top" alt={city.name} />
              <div className='cardFooter'>
                <h5 className="card-country-field">{city.country}</h5>
                <div className='text-center'>
                  <div>
                    <Link to={`/citydetails/${city._id}`} className="detailsButt">
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cities;

