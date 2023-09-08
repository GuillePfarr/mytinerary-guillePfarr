// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import "../Details/citydetails.css";

// const CityDetails = () => {
//   const [city, setCity] = useState({});
//   const { id } = useParams(); 

//   useEffect(() => {

//     axios.get(`http://localhost:3000/api/cities/${id}`)
//       .then((res) => {
//         setCity(res.data.response);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [id]); 


//   return (
//     <div className="container">
// <div className='underConstContainer'>

//      </div> 
// <h2>City Details</h2>
//       <div className="card">
//         <img src={city.image} className="card-img-top" alt={city.name} />
//         <div className="card-body">
//           <h5 className="card-title">{city.name}</h5>
//           <p className="card-text">Under construction</p>
//         </div>
//       </div>
//       <Link to="/cities" className="btn btn-primary">
//          Back to Cities
//       </Link>
//     </div>
//   );
// };

// export default CityDetails;


// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import "../Details/citydetails.css";

// const CityDetails = () => {
//   const [city, setCity] = useState({});
//   const { id } = useParams();

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/api/cities/${id}`)
//       .then((res) => {
//         setCity(res.data.response);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [id]);

//   const cardStyle = {
//     width: '60vw',
//     height: '40vh',
//   };

//   return (
//     <div className="container">
//       <div className="underConstContainer"></div>
//       <h2>City Details</h2>
//       <div className="card" style={cardStyle}>
//         <img src={city.image} className="card-img-top" alt={city.name} />
//         <div className="card-body">
//           <h5 className="card-title">{city.name}</h5>
//           <p className="card-text">Under construction</p>
//         </div>
//       </div>
//       <div className="card" style={cardStyle}>

//         <div className="card-body">
//           <img src={city.image} className="card-img-top" alt={city.name} />

//           <h5 className="card-title">{city.name}</h5>
//           <p className="card-text">Under construction</p>
//         </div>
//       </div>
//       <Link to="/cities" className="btn btn-primary">
//         Back to Cities
//       </Link>
//     </div>
//   );
// };

// export default CityDetails;

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import "../Details/citydetails.css";

const CityDetails = () => {
  const [city, setCity] = useState({});
  const [itineraries, setItineraries] = useState([]);
  const { id } = useParams();

  useEffect(() => {

    axios
      .get(`http://localhost:3000/api/cities/${id}`)
      .then((res) => {
        setCity(res.data.response);
      })
      .catch((error) => {
        console.error(error);
      });


    axios
      .get(`http://localhost:3000/api/itineraries/bycity/${id}`)
      .then((res) => {
        setItineraries(res.data.response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const cardStyle = {
    width: '60vw',
    height: '40vh',
  };

  return (
    <div className="container">
      <div className="underConstContainer"></div>
      <h2>City Details</h2>
      <div className="card" style={cardStyle}>

        <div className="card-body">
          <img src={city.image} className="card-img-top" alt={city.name} />

          <h5 className="card-title">{city.name}</h5>
          <p className="card-text">Under construction</p>
        </div>
      </div>

      <Link to="/cities" className="btn btn-primary">
        Back to Cities
      </Link>



      <h3>Itineraries for {city.name}</h3>
      <div className="itineraries">
        {itineraries.map((itinerary) => (
          <div key={itinerary._id} className="card" style={cardStyle}>
            <img src={itinerary.user_image} className="details-card-img-top" alt={itinerary.user_name} />
            <div className="card-body">
              <h5 className="card-title">{itinerary.user_name}</h5>
              <p className="card-text">Price: {itinerary.price}</p>
              <p className="card-text">Duration: {itinerary.duration} hours</p>
            </div>
          </div>


        ))}
      </div>

      <Link to="/cities" className="btn btn-primary">
        Back to Cities
      </Link>
    </div>



  );
};

export default CityDetails;
