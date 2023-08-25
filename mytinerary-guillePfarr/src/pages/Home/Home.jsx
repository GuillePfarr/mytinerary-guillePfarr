import React from 'react';
import Carousel from "../../components/Carousel/Carousel";
import { Link, useLocation } from 'react-router-dom';
import "./home.css";

const Home = () => {
  const location = useLocation();

  return (
    <main>
      <section className="homeHero">
        <div className="homeHeroTitle">
          "Find your perfect trip. Designed by insiders who know and love their cities"
        </div>
        <img className="heroBgImage" src="https://ik.imgkit.net/3vlqs5axxjf/TW-Asia/ik-seo/uploadedImages/Industry/Travel_Agents/AdobeStock_322669629/Flight-Centre-nabs-luxury-tour-operator-Scott-Dunn.jpg?tr=w-780%2Ch-440%2Cfo-auto" alt="heroBgImage"></img>

        <div className="button-wrapper">

          <Link className="button cta-button" to="/Cities"></Link>

          <p className='cta-text'>Explore Cities</p>
        </div>

      </section>
<div className='carousel-title'><h3 className='h3-carousel-title'>Popular MyTineraries</h3></div>
      <section className="home-carousel">

  
  <Carousel />
      </section>
    </main>
  );
};

export default Home;
