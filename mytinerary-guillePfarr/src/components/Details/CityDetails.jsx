import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityDetails, fetchCityItineraries } from '../../redux/reducers/cityDetailsSlice';
import { Card, Row, Col } from 'react-bootstrap';

import '../Details/citydetails.css';

const CityDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();


  const city = useSelector((state) => state.cityDetails.city);
  const itineraries = useSelector((state) => state.cityDetails.itineraries);

  useEffect(() => {

    dispatch(fetchCityDetails(id));
    dispatch(fetchCityItineraries(id));
  }, [dispatch, id]);

  const cardStyle = {
    width: '70vw',
    minHeight: '40vh',
  };

  return (
    <div className="container">
      <div className="underConstContainer"></div>
      <h2>City Details</h2>
      <div className="card" style={cardStyle}>
        <div className="card-body">
          <img src={city.image} className="card-img-top" alt={city.name} />
          <h5 className="card-title">{city.name}</h5>
          <p className='city-description'>{city.description}</p>
        </div>
      </div>

      <h3>Itineraries for {city.name}</h3>
      <Row>
        {itineraries.length > 0 ? (
          itineraries.map((itinerary) => (
            <Col key={itinerary._id} >
              <Card>
                <Card.Body>
                  <img src={itinerary.user_image} className="card-img-top" alt={itinerary.user_name} />
                  <h5 className="card-title">{itinerary.user_name}</h5>
                  <p className="card-text">
                    
                  </p>
                </Card.Body>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Price: {itinerary.price}</li>
                  <li className="list-group-item">Duration: {itinerary.duration} hours</li>
                  <li className="list-group-item">
                    <div className="price-indicator">
                      {[...Array(itinerary.price)].map((_, index) => (
                        <img key={index} src="" alt={`Billete ${index + 1}`} />
                      ))}
                    </div>
                    <p class="list-group-title">#Hashtags</p>
                    <ul>

                      {itinerary.hashtag.map((tag, index) => (
                        <li key={index}>{tag}</li>
                      ))}
                    </ul>
                  </li>
                </ul>

              </Card>
            </Col>
          ))
        ) : (
          <div className="no-itineraries-card" style={cardStyle}>
            <div className="under-const-card-body">
              <p className="under-const-card-text"><strong>This city does not have itineraries yet.</strong></p>
            </div>
          </div>
        )}
      </Row>
      <Link to="/cities" className="btn btn-primary">
        Back to Cities
      </Link>
    </div>
  );
};

export default CityDetails;
