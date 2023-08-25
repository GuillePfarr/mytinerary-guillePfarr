import React from 'react';
import { Link } from 'react-router-dom'; // Para crear el enlace de vuelta a la página de ciudades

const CityDetails = ({ city }) => {
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
