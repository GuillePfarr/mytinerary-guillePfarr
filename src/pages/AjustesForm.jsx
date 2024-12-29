// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function AjustesForm() {
//   const [ajustesData, setAjustesData] = useState({
//     tempMin: '',
//     tempMax: '',
//     humyMin: '',
//     humyMax: ''
//   });

//   useEffect(() => {
//     const fetchAjustes = async () => {
//       try {
//         const response = await axios.get(import.meta.env.VITE_API_URL + '/api/ajuste');
//         const ajustes = response.data.response;
//         const currentAjusteObj = ajustes.find(ajuste => ajuste._id === '676e68bcce18f424bfd35d5a');
//         setAjustesData(currentAjusteObj || {});
//       } catch (error) {
//         console.error('Error fetching ajustes:', error);
//       }
//     };

//     fetchAjustes();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAjustesData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Evitar recargar la página
//     try {
//       const response = await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/ajuste/${ajustesData._id}`, // Asegúrate de que el endpoint sea correcto
//         ajustesData
//       );
//       console.log('Datos actualizados:', response.data);
//       alert('Ajustes actualizados correctamente');
//     } catch (error) {
//       console.error('Error updating ajustes:', error);
//       alert('Error al actualizar los ajustes');
//     }
//   };

//   if (!ajustesData) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Min Temperature:
//         <input
//           type="number"
//           name="tempMin"
//           value={ajustesData.tempMin || ''}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Max Temperature:
//         <input
//           type="number"
//           name="tempMax"
//           value={ajustesData.tempMax || ''}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Min Humidity:
//         <input
//           type="number"
//           name="humyMin"
//           value={ajustesData.humyMin || ''}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Max Humidity:
//         <input
//           type="number"
//           name="humyMax"
//           value={ajustesData.humyMax || ''}
//           onChange={handleChange}
//         />
//       </label>
//       <button type="submit">Actualizar Ajustes</button>
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
    humyMax: '',
  });

  const [editMode, setEditMode] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [codeValidated, setCodeValidated] = useState(false);

  // Cargar datos actuales de la base de datos
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
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/ajuste/${ajustesData._id}`,
        ajustesData
      );
      alert('Ajustes actualizados correctamente');
    } catch (error) {
      console.error('Error updating ajustes:', error);
      alert('Error al actualizar los ajustes');
    }
  };

  const handleRequestCode = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + '/api/request-code', {
        userId: ajustesData._id, // Usamos el ID del usuario actual o cualquier identificación relevante
      });
      setCodeSent(true);
      setAccessCode(response.data.code); // Solo para desarrollo (eliminar en producción)
      alert('Código de acceso enviado a su correo electrónico.');
    } catch (error) {
      console.error('Error sending access code:', error);
      alert('Error al solicitar el código de acceso.');
    }
  };

  const handleValidateCode = async () => {
    if (codeInput === accessCode) {
      setCodeValidated(true);
      alert('Código validado. Ahora puede editar los valores.');
    } else {
      alert('Código incorrecto.');
    }
  };

  if (!ajustesData) {
    return <p>Cargando ajustes...</p>;
  }

  return (
    <div>
      {!editMode && (
        <form>
          <label>
            Min Temperature:
            <input
              type="number"
              name="tempMin"
            //   value={ajustesData.tempMin || ''}
              value={ajustesData.tempMin !== undefined && ajustesData.tempMin !== null ? ajustesData.tempMin : ''}

              disabled
            />
          </label>
          <label>
            Max Temperature:
            <input
              type="number"
              name="tempMax"
              value={ajustesData.tempMax || ''}
              disabled
            />
          </label>
          <label>
            Min Humidity:
            <input
              type="number"
              name="humyMin"
              value={ajustesData.humyMin || ''}
              disabled
            />
          </label>
          <label>
            Max Humidity:
            <input
              type="number"
              name="humyMax"
              value={ajustesData.humyMax || ''}
              disabled
            />
          </label>
          <button type="button" onClick={handleRequestCode}>
            Modificar Valores
          </button>
        </form>
      )}

      {editMode && !codeValidated && (
        <div>
          <p>Ingrese el código de acceso enviado a su correo electrónico:</p>
          <input
            type="text"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
          />
          <button type="button" onClick={handleValidateCode}>
            Validar Código
          </button>
        </div>
      )}

      {editMode && codeValidated && (
        <form onSubmit={handleSubmit}>
          <label>
            Min Temperature:
            <input
              type="number"
              name="tempMin"
            //   value={ajustesData.tempMin || ''}
              value={ajustesData.tempMin !== undefined && ajustesData.tempMin !== null ? ajustesData.tempMin : ''}

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
      )}
    </div>
  );
}

export default AjustesForm;
