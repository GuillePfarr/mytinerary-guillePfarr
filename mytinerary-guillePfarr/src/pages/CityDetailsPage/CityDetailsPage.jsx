import React from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el parámetro de la URL
import CityDetails from './CityDetails'; // Importa el componente CityDetails

const CityDetailsPage = ({ cities }) => {
  // Obtén el parámetro de la URL (nombre de la ciudad)
  const { cityName } = useParams();

  // Busca la ciudad por nombre en el array de ciudades
  const selectedCity = cities.find(city => city.name === cityName);

  if (!selectedCity) {
    // Manejo de error si la ciudad no se encuentra
    return <div>La ciudad no se encontró.</div>;
  }

  return <CityDetails city={selectedCity} />;
};

export default CityDetailsPage;
