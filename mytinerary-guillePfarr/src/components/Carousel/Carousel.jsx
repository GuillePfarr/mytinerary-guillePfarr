import "./";
import { useState } from "react";

const Carousel = () => {
    const events = [
        {
            name: "Collectivities Party",
            image: "https://unsplash.com/es/fotos/CRMjqDZwxS4"
        }
    ];

    let [contador, setContador] = useState(0);
console.log(contador)
    const prev = () => {
        if (contador == 0) {
            setContador(events.lenght - 1);
        } else {
            setContador(contador - 1);
        }
    };

    const next = () => {
        if (contador == events.length - 1) {
            setContador(0);
        } else {
            setContador(contador + 1);
        }
    };
    return (
        <div className="carosuel">
            <button onClick={prev} > {'<'} </button>
            <img className="carousel-image " src={events[contador].image} alt="" />
            <button onClick={next} > {'>'} </button>
        </div>

    );
};

export default Carousel;