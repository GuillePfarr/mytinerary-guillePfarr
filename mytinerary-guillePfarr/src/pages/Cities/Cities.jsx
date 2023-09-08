import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Cities/cities.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import citiesActions from '../../redux/actions/citiesActions.js';

function Cities() {
  const dispatch = useDispatch();
  const { filtrarCities, getAllCities } = citiesActions;
  const [filter, setFilter] = useState('');
  const [noResults, setNoResults] = useState(false);
  const { cities, filteredCities } = useSelector((store) => store.cities);

  const handleFilterChange = (event) => {
    const filterText = event.target.value.toLowerCase();

    // Dispatch la acción de filtro
    dispatch(filtrarCities(filterText));

    setFilter(filterText);
  };

  useEffect(() => {
    dispatch(getAllCities());
  }, [dispatch]);

  useEffect(() => {
    setNoResults(filteredCities?.length === 0);
  }, [filteredCities]);

  return (
    <div className="container">
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
        {filteredCities?.map((city) => (
          <div className="card" key={city.name}>
            <div className="card-body">
              <h5 className="card-title">{city.name}</h5>
              <img src={city.image} className="card-img-top" alt={city.name} />
              <div className='cardFooter'>
                <h5 className="card-country-field">{city.country}</h5>
                <div className='text-center'>
                  <button>
                    <Link to={`/citydetails/${city._id}`} className="btn btn-primary">
                      Details
                    </Link>
                  </button>
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
