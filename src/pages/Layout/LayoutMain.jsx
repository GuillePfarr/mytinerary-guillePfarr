import React, { useEffect } from 'react'
import HeaderMain from '../../components/HeaderMain/HeaderMain';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import NavbarMain from '../../components/NavbarMain/NavbarMain';



const links = [
  { value: '#', content: 'Link 1', id: '1' },
  { value: '#', content: 'Link 2', id: '2' },
  { value: '#', content: 'Link 3', id: '3' },
  { value: '#', content: 'Link 4', id: '4' },
]

const LayoutMain = () => {
 
  const location = useLocation()
  

  return (
    <div className='layout-main'>
      <NavbarMain />
      <Outlet />
      <Footer />
    </div>
  )
}

export default LayoutMain;