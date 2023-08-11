import "./carosuel.css";

const Carousel = ( ) =>{
 const events = [
    {
      name: "Collectivities Party",
      image: "https://i.postimg.cc/Fs03hQDt/Collectivities-Partry.jpg"
    }
  ];

const prev = () =>{
}

const next = () =>{
}
return (
<div className="carosuel">
<button onClick= { prev } > {'<'} </button>
<img className="carousel-image "src={events[0].image} alt="" />
<button onClick= { next } > {'>'} </button>
</div>

);
};

export default Carousel;