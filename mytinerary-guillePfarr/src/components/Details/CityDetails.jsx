
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const CityDetails = () => {
  const [city, setCity] = useState({});
  const { id } = useParams(); 

  useEffect(() => {
    
    axios.get(`http://localhost:3000/api/cities/${id}`)
      .then((res) => {
        setCity(res.data.response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]); 


  return (
    <div className="container">
      <h2>Detalles de la Ciudad</h2>
      <div className="card">
        <img src={city.image} className="card-img-top" alt={city.name} />
        <div className="card-body">
          <h5 className="card-title">{city.name}</h5>
          <p className="card-text">Descripción detallada de la ciudad.</p>
        </div>
      </div>
      <Link to="/cities" className="btn btn-primary">
        Volver a la página de ciudades
      </Link>
    </div>
  );
};

export default CityDetails;
