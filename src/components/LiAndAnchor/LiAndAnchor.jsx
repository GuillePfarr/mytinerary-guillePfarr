import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./liandanchor.css"
const LiAndAnchor = (props) => {

    const { value, content} = props

    return (
        <li className='navbarmainli'>
            
            <NavLink 
                to={value}>{content}</NavLink>
        </li>
    )
}

export default LiAndAnchor;