// import { useEffect, useState } from 'react';
import './App.css';
import LayoutMain from './pages/Layout/LayoutMain';
import Home from './pages/Home/Home';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import Events from './pages/Events/Events';
import Componente404 from './pages/Componente404';
import Cities from './pages/Cities/Cities';

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
        path: '/events/:PropiedadPepito',
        element: <Events />
      },
      // {
      //   path: '/events/:id',
      //   element: <Events />
      // },
      {
        path: '*',
        element: <Componente404 />
      }
    ]
  },

])


function App() {
  // const [count, setCount] = useState(0)

  

  return (
    // <MainLayout>
    <RouterProvider router={router} />
    // {/* <Home /> */}
    // {/* </MainLayout> */}
  )
}

export default App