import React from 'react'

const EventCard = (props) => {
console.log(props)
    return (
        <article className='bg-secondary rounded'>
            <img src={props.evento.image} width="300" height="200" />
            <h2 className='text-center text-white py-3'>{props.evento.name}</h2>
        </article>
    )
}

export default EventCard