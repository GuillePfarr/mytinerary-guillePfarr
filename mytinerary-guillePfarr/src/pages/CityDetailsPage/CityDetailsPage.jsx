import React from 'react';
import { useParams } from 'react-router-dom'; 
import CityDetails from './CityDetails'; 

const CityDetailsPage = ({ cities }) => {
  
  const { cityName } = useParams();

 
  const selectedCity = cities.find(city => city.name === cityName);

  if (!selectedCity) {
   
    return <div>La ciudad no se encontró.</div>;
  }

  return <CityDetails city={selectedCity} />;
};

export default CityDetailsPage;
