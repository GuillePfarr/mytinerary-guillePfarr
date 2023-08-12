import React from "react";

const EventCard = ({ evento }) => {
  return (
    <article className="bg-secondary rounded col-3 h-auto">
      <img src={evento.image} className="w-100 h-75" />
      <h2 className="text-center text-white py-3">{evento.name}</h2>
    </article>
  );
};

export default EventCard;