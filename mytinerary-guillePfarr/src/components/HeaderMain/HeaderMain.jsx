import React, { useState } from 'react'
import NavbarMain from '../Navbar/NavbarMain'


// import './Header.css'
// Header.css .mi-ul

const links = [
    { value: '/', content: 'Home', id: '1', active: true },
    { value: '/events', content: 'Events', id: '2', active: false },
    { value: '/algo', content: 'Link 3', id: '3', active: false },
    { value: '/algo2', content: 'Link 4', id: '4', active: false },
]

const HeaderMain = () => {

    const [show, setShow] = useState(false)
    return (
        <header className='flex h-[5vh] items-center px-16 justify-between  w-3/4'>
            {/* <Logo /> */}
            <NavbarMain links={links} />

            {/* <p onClick={() => setShow(!show)}>Show time</p> */}
            {
                // show && <Clock />
            }
           

        </header>
    )
}

export default HeaderMain;