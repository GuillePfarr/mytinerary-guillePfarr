import './App.css';
import LayoutMain from './pages/Layout/LayoutMain';
import Home from './pages/Home/Home';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import Componente404 from './pages/Componente404';
import Cities from './pages/Cities/Cities';
import CityDetails from './components/Details/CityDetails';

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
        path: '*',
        element: <CityDetails />
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