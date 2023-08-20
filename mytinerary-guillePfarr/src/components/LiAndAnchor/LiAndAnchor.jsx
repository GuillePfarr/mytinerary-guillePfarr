import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./liandanchor.css"
const LiAndAnchor = (props) => {

    const { value, content, active } = props

    return (
        <li>
            
            <NavLink className={({ isActive }) =>
                isActive
                    ? "text-xl text-white transition-all duration-500"
                    : "text-xl text-gray-500 hover:text-white transition-all duration-500"
            } to={value}>{content}</NavLink>
        </li>
    )
}

export default LiAndAnchor;