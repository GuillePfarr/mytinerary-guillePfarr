// import React, { useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCityDetails, fetchCityItineraries } from '../../redux/reducers/cityDetailsSlice'; 

// import '../Details/citydetails.css';

// const CityDetails = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();

  
//   const city = useSelector((state) => state.cityDetails.city);
//   const itineraries = useSelector((state) => state.cityDetails.itineraries);

//   useEffect(() => {
    
//     dispatch(fetchCityDetails(id));
//     dispatch(fetchCityItineraries(id));
//   }, [dispatch, id]);

//   const cardStyle = {
//     width: '60vw',
//     height: '40vh',
//   };

//   return (
//     <div className="container">
//       <div className="underConstContainer"></div>
//       <h2>City Details</h2>
//       <div className="card" style={cardStyle}>
//         <div className="card-body">
//           <img src={city.image} className="card-img-top" alt={city.name} />
//           <h5 className="card-title">{city.name}</h5>
//         </div>
//       </div>

//       <h3>Itineraries for {city.name}</h3>
//       <div className="itineraries">
//         {itineraries.length > 0 ? (
//           itineraries.map((itinerary) => (
//             <div key={itinerary._id} className="card" style={cardStyle}>
//               <img src={itinerary.user_image} className="details-card-img-top" alt={itinerary.user_name} />
//               <div className="card-body">
//                 <h5 className="card-title">{itinerary.user_name}</h5>
//                 <p className="card-text">Price: {itinerary.price}</p>
//                 <p className="card-text">Duration: {itinerary.duration} hours</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="no-itineraries-card" style={cardStyle}>
//             <div className="under-const-card-body">
//               <p className="under-const-card-text"><strong>This city does not have itineraries yet.</strong></p>
//             </div>
//           </div>
//         )}
//       </div>

//       <Link to="/cities" className="btn btn-primary">
//         Back to Cities
//       </Link>
//     </div>
//   );
// };

// export default CityDetails;

import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityDetails, fetchCityItineraries } from '../../redux/reducers/cityDetailsSlice'; 

import '../Details/citydetails.css';

const CityDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // Obtén los datos de Redux store
  const city = useSelector((state) => state.cityDetails.city);
  const itineraries = useSelector((state) => state.cityDetails.itineraries);

  useEffect(() => {
    // Dispara las acciones para cargar datos
    dispatch(fetchCityDetails(id));
    dispatch(fetchCityItineraries(id));
  }, [dispatch, id]);

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
        </div>
      </div>

      <h3>Itineraries for {city.name}</h3>
      
        {itineraries.length > 0 ? (
          itineraries.map((itinerary) => (
            <div key={itinerary._id} className="itinerary-card" style={cardStyle}>
              <div className="itineraries-card-body">
                <img src={itinerary.user_image} className="details-card-img-top" alt={itinerary.user_name} />
                <h5 className="itinerary-user-name">{itinerary.user_name}</h5>
                <p className="itinerary-price">Price: {itinerary.price}</p>
                <p className="itinerary-duration">Duration: {itinerary.duration} hours</p>
                <div className='itinerary-hashtags'>
                  <p>Hashtags:</p>
                  <ul>
                    {itinerary.hashtag.map((tag, index) => (
                      <li key={index}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-itineraries-card" style={cardStyle}>
            <div className="under-const-card-body">
              <p className="under-const-card-text"><strong>This city does not have itineraries yet.</strong></p>
            </div>
          </div>
        )}
      

      <Link to="/cities" className="btn btn-primary">
        Back to Cities
      </Link>
    </div>
  );
};

export default CityDetails;
