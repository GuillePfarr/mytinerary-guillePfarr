import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import "../Details/citydetails.css";

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
<div className='underConstContainer'>

     </div> 
<h2>City Details</h2>
      <div className="card">
        <img src={city.image} className="card-img-top" alt={city.name} />
        <div className="card-body">
          <h5 className="card-title">{city.name}</h5>
          <p className="card-text">Under construction</p>
        </div>
      </div>
      <Link to="/cities" className="btn btn-primary">
         Back to Cities
      </Link>
    </div>
  );
};

export default CityDetails;
