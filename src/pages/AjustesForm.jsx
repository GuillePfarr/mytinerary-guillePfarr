// import React from 'react';
// import { useLocation } from 'react-router-dom';

// function AjustesForm() {
//   const location = useLocation();
//   const ajustesData = location.state?.ajustesData || {}; 

//   return (
//     <form>
//       <label>
//         Min Temperature:
//         <input type="number" defaultValue={ajustesData.tempMin || ''} />
//       </label>
//       <label>
//         Max Temperature:
//         <input type="number" defaultValue={ajustesData.tempMax || ''} />
//       </label>
//       <label>
//         Min Humidity:
//         <input type="number" defaultValue={ajustesData.humyMin || ''} />
//       </label>
//       <label>
//         Max Humidity:
//         <input type="number" defaultValue={ajustesData.humyMax || ''} />
//       </label>
//     </form>
//   );
// }

// export default AjustesForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AjustesForm() {
  const [ajustesData, setAjustesData] = useState({
    tempMin: '',
    tempMax: '',
    humyMin: '',
    humyMax: ''
  });

  useEffect(() => {
    const fetchAjustes = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/api/ajuste');
        const ajustes = response.data.response;
        const currentAjusteObj = ajustes.find(ajuste => ajuste._id === '676e68bcce18f424bfd35d5a');
        setAjustesData(currentAjusteObj || {});
      } catch (error) {
        console.error('Error fetching ajustes:', error);
      }
    };

    fetchAjustes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAjustesData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recargar la página
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/ajuste/${ajustesData._id}`, // Asegúrate de que el endpoint sea correcto
        ajustesData
      );
      console.log('Datos actualizados:', response.data);
      alert('Ajustes actualizados correctamente');
    } catch (error) {
      console.error('Error updating ajustes:', error);
      alert('Error al actualizar los ajustes');
    }
  };

  if (!ajustesData) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Min Temperature:
        <input
          type="number"
          name="tempMin"
          value={ajustesData.tempMin || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Max Temperature:
        <input
          type="number"
          name="tempMax"
          value={ajustesData.tempMax || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Min Humidity:
        <input
          type="number"
          name="humyMin"
          value={ajustesData.humyMin || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Max Humidity:
        <input
          type="number"
          name="humyMax"
          value={ajustesData.humyMax || ''}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Actualizar Ajustes</button>
    </form>
  );
}

export default AjustesForm;
