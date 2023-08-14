import React, { useEffect } from 'react'
import HeaderMain from '../../components/HeaderMain/HeaderMain';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

// import './mainLayout.css'

// mainLayout.css .mi-ul

const links = [
  { value: '#', content: 'Link 1', id: '1' },
  { value: '#', content: 'Link 2', id: '2' },
  { value: '#', content: 'Link 3', id: '3' },
  { value: '#', content: 'Link 4', id: '4' },
]

const LayoutMain = () => {
  // const navigate = useNavigate()
  const location = useLocation()
  console.log(location);
  // useEffect(() => {
  //     if (location.pathname === '/') navigate('/home')
  // }, [])

  return (
    <div className='w-full min-h-screen flex flex-col items-center bg-[#212529]'>
      <HeaderMain />


      <Outlet />
      
      <Footer />

    </div>
  )
}

export default LayoutMain;