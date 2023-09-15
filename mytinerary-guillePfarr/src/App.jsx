import './App.css';
import LayoutMain from './pages/Layout/LayoutMain';
import Home from './pages/Home/Home';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import Componente404 from './pages/Componente404';
import Cities from './pages/Cities/Cities';
import CityDetails from './components/Details/CityDetails';
import SignUp from './pages/signup.jsx';
import SignIn from './pages/signin.jsx';
import LogOut from './pages/LogOut';




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
      }

    ]
  },

])

function App() {
  return (

    <RouterProvider router={router} />

  )
}

export default App