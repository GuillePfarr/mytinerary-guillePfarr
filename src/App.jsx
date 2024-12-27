import './App.css';
import LayoutMain from './pages/Layout/LayoutMain';
import Home from './pages/Home/Home';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import Componente404 from './pages/Componente404';
import Cities from './pages/Cities/Cities';
import CityDetails from './components/Details/CityDetails';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import LogOut from './pages/LogOut';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { signInWithToken } from './redux/actions/userActions';
import Vanguard from './pages/Vanguard/Vanguard.jsx';




const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutMain />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/cities',
        element: <Cities />
      },

      {
        path: '/citydetails/:id',
        element: <CityDetails />
      },

      {
        path: '*',
        element: <Componente404 />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/signin',
        element: <SignIn />
      },
      {
        path: '/logout',
        element: <LogOut />
      },
      {
        path: '/vanguard',
        element: <Vanguard />
      },
      
   
    ]
  },

])

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      dispatch(signInWithToken(token))

    }
  }, [])

  return (

    <RouterProvider router={router} />

  )
}

export default App