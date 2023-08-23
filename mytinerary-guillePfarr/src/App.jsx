import './App.css';
import LayoutMain from './pages/Layout/LayoutMain';
import Home from './pages/Home/Home';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
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
        path: '*',
        element: <Componente404 />
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