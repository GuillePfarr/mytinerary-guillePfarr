import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityDetails, fetchCityItineraries, toggleAccordion } from '../../redux/reducers/cityDetailsSlice';
import { Card, Row, Col } from 'react-bootstrap';
import '../Details/citydetails.css';
// import bankNote from "../../../public/bankNote.png";

const CityDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const city = useSelector((state) => state.cityDetails.city);
  const itineraries = useSelector((state) => state.cityDetails.itineraries);
  const accordionState = useSelector((state) => state.cityDetails.accordionOpen);

  useEffect(() => {
   
    window.scrollTo(0, 0);

    dispatch(fetchCityDetails(id));
    dispatch(fetchCityItineraries(id));
  }, [dispatch, id]);

  const cardStyle = {
    width: '70vw',
    minHeight: '40vh',
  };

  return (
    <div className="cityDetails-container">
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

                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Price:  <div className="price-indicator">
                      {[...Array(itinerary.price)].map((_, index) => (
                        <img className="bankNote" key={index} src="/bankNote.png" alt={`Billete ${index + 1}`} />
                      ))}
                    </div></li>
                    <li className="list-group-item">Duration: <div className="duration-indicator">
                      {itinerary.duration} hours</div></li>

                    <li className="list-group-item">

                      <p className="list-group-title">Hashtags</p>
                      <ul>

                        {itinerary.hashtag.map((tag, index) => (
                          <li key={index}>{tag}</li>
                        ))}
                      </ul>
                    </li>
                  </ul>

                  <button
                    onClick={() => {
                      dispatch(toggleAccordion(itinerary._id));
                    }}
                    className="btn btn-primary"
                  >
                    {accordionState[itinerary._id] ? 'View Less' : 'View More'}
                  </button>
                </Card.Body>

                {accordionState[itinerary._id] && (
                  <div className="accordion">
                    <div className="accordion-background">


                      <div className="accordion-message">
                        <p>This itinerary does not have activities yet</p>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </Col>
          ))
        ) : (
          <div className="no-itineraries-card" style={cardStyle}>
            <div className="under-const-card-body">
              <p className="under-const-card-text"><strong>This City does not have itineraries yet.</strong></p>
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

