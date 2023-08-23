
import React, { useState, useEffect } from "react";
import "./carousel.css";


const slides =[ [ 
      { image: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Castle_Neuschwanstein.jpg", name: "Ciudad 1" },
      { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Salzburg_panorama.jpg/1280px-Salzburg_panorama.jpg", name: "Ciudad 2" },
      { image: "https://www.wendyperrin.com/wp-content/uploads/2019/03/Marsaxlokk_Harbour_6.jpg", name: "Ciudad 3" },
      { image: "https://www.wendyperrin.com/wp-content/uploads/2017/12/shutterstock_388289746.jpg", name: "Barcelona-Spain" },
      
    
      { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Calle_Dlugie_Pobrzeze%2C_Gdansk%2C_Polonia%2C_2013-05-20%2C_DD_06.jpg/1024px-Calle_Dlugie_Pobrzeze%2C_Gdansk%2C_Polonia%2C_2013-05-20%2C_DD_06.jpg", name: "Ciudad 5" },
      { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Hagia_Sophia_Mars_2013.jpg/800px-Hagia_Sophia_Mars_2013.jpg", name: "Istambul" },
      { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Luzern_Kapellbruecke.jpg/800px-Luzern_Kapellbruecke.jpg", name: "Lucerne Swizerland" },
      { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Kremlevskaya_Naberezhnaja_Moscow.hires.jpg/800px-Kremlevskaya_Naberezhnaja_Moscow.hires.jpg", name: "Moscow Russia" },
   
      { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/London_Eye_Twilight_April_2006.jpg/800px-London_Eye_Twilight_April_2006.jpg", name: "London England" },
      { image:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/HerdenkingVuurgrensRotterdam1940_2007_edit1.jpg/800px-HerdenkingVuurgrensRotterdam1940_2007_edit1.jpg", name: "Rotterdam Netherlands" },
      { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Colosseum_in_Rome-April_2007-1-_copie_2B.jpg/1024px-Colosseum_in_Rome-April_2007-1-_copie_2B.jpg", name: "Rome Italy" },
      { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Attica_06-13_Athens_25_Olympian_Zeus_Temple.jpg/800px-Attica_06-13_Athens_25_Olympian_Zeus_Temple.jpg", name: "Athens Greek" }
   ],]

const Carousel = () => {
  

  const [currentSlide, setCurrentSlide] = useState(0);
  const [pause, setPause] = useState(false);

  const nextSlide = () => {
    if (!pause) {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [pause]);

  const pauseCarousel = () => {
    setPause(true);
    setTimeout(() => {
      setPause(false);
    }, 10000);
  };

return (
    <div className="carousel">
      <button className="carousel-button prev" onClick={() => setCurrentSlide((prevSlide) => (prevSlide + slides.length - 1) % slides.length)}>
        {"<<"}
      </button>
      <div className="carousel-slide">
        {slides[currentSlide].map((imageInfo, index) => (
          <div key={index} className="carousel-image">
            <img src={imageInfo.image} alt={imageInfo.name} />
          </div>
        ))}
      </div>
      <button className="carousel-button next" onClick={() =>setCurrentSlide((prevSlide) => (prevSlide + slides.length + 1) % slides.length) }>
        {">>"}
      </button>
    </div>
  );
};

export default Carousel;



