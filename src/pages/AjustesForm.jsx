// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function AjustesForm() {
//   const [ajustesData, setAjustesData] = useState({
//     tempMin: '',
//     tempMax: '',
//     humyMin: '',
//     humyMax: '',
//   });

//   const [editMode, setEditMode] = useState(false);
//   const [codeSent, setCodeSent] = useState(false);
//   const [accessCode, setAccessCode] = useState('');
//   const [codeInput, setCodeInput] = useState('');
//   const [codeValidated, setCodeValidated] = useState(false);

  
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
//     e.preventDefault();
//     try {
//       const response = await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/ajuste/${ajustesData._id}`,
//         ajustesData
//       );
//       alert('Ajustes actualizados correctamente');
//     } catch (error) {
//       console.error('Error updating ajustes:', error);
//       alert('Error al actualizar los ajustes');
//     }
//   };

//   const handleRequestCode = async () => {
//     try {
//       const response = await axios.post(import.meta.env.VITE_API_URL + '/api/request-code', {
//         userId: ajustesData._id, 
//       });
//       setCodeSent(true);
//       setAccessCode(response.data.code); 
//       alert('Código de acceso enviado a su correo electrónico.');
//     } catch (error) {
//       console.error('Error sending access code:', error);
//       alert('Error al solicitar el código de acceso.');
//     }
//   };

//   const handleValidateCode = async () => {
//     if (codeInput === accessCode) {
//       setCodeValidated(true);
//       alert('Código validado. Ahora puede editar los valores.');
//     } else {
//       alert('Código incorrecto.');
//     }
//   };

//   if (!ajustesData) {
//     return <p>Cargando ajustes...</p>;
//   }

//   return (
//     <div>
//       {!editMode && (
//         <form>
//           <label>
//             Min Temperature:
//             <input
//               type="number"
//               name="tempMin"
            
//               value={ajustesData.tempMin !== undefined && ajustesData.tempMin !== null ? ajustesData.tempMin : ''}

//               disabled
//             />
//           </label>
//           <label>
//             Max Temperature:
//             <input
//               type="number"
//               name="tempMax"
//               value={ajustesData.tempMax || ''}
//               disabled
//             />
//           </label>
//           <label>
//             Min Humidity:
//             <input
//               type="number"
//               name="humyMin"
//               value={ajustesData.humyMin || ''}
//               disabled
//             />
//           </label>
//           <label>
//             Max Humidity:
//             <input
//               type="number"
//               name="humyMax"
//               value={ajustesData.humyMax || ''}
//               disabled
//             />
//           </label>
//           <button type="button" onClick={handleRequestCode}>
//             Modificar Valores
//           </button>
//         </form>
//       )}

//       {editMode && !codeValidated && (
//         <div>
//           <p>Ingrese el código de acceso enviado a su correo electrónico:</p>
//           <input
//             type="text"
//             value={codeInput}
//             onChange={(e) => setCodeInput(e.target.value)}
//           />
//           <button type="button" onClick={handleValidateCode}>
//             Validar Código
//           </button>
//         </div>
//       )}

//       {editMode && codeValidated && (
//         <form onSubmit={handleSubmit}>
//           <label>
//             Min Temperature:
//             <input
//               type="number"
//               name="tempMin"
           
//               value={ajustesData.tempMin !== undefined && ajustesData.tempMin !== null ? ajustesData.tempMin : ''}

//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Max Temperature:
//             <input
//               type="number"
//               name="tempMax"
//               value={ajustesData.tempMax || ''}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Min Humidity:
//             <input
//               type="number"
//               name="humyMin"
//               value={ajustesData.humyMin || ''}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Max Humidity:
//             <input
//               type="number"
//               name="humyMax"
//               value={ajustesData.humyMax || ''}
//               onChange={handleChange}
//             />
//           </label>
//           <button type="submit">Actualizar Ajustes</button>
//         </form>
//       )}
//     </div>
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

  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false); // Modo edición.
  const [message, setMessage] = useState(''); // Mensaje dinámico.

  // Obtener los datos de la base de datos al cargar el componente.
  useEffect(() => {
    const fetchAjustes = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/api/ajuste');
        const ajustes = response.data.response;
        const currentAjusteObj = ajustes.find(ajuste => ajuste._id === '676e68bcce18f424bfd35d5a'); // Cambia este ID por el que corresponda.
        setAjustesData(currentAjusteObj || {});
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los ajustes:', error);
        setMessage('Error al cargar los ajustes. Intente más tarde.');
        setLoading(false);
      }
    };

    fetchAjustes();
  }, []);

  // Manejar cambios en los campos del formulario.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAjustesData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario al servidor.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos antes de enviar.
    if (
      ajustesData.tempMin === '' ||
      ajustesData.tempMax === '' ||
      ajustesData.humyMin === '' ||
      ajustesData.humyMax === ''
    ) {
      setMessage('Por favor, complete todos los campos.');
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/ajuste/${ajustesData._id}`,
        ajustesData
      );
      setMessage('Valores modificados correctamente.');
      setEditMode(false); // Desactivamos el modo edición tras guardar.
    } catch (error) {
      console.error('Error al actualizar los ajustes:', error);
      setMessage('Error al actualizar los valores. Intente nuevamente.');
    }
  };

  // Activar el modo edición.
  const enableEditMode = () => {
    setEditMode(true);
    setMessage('Ahora puede editar los valores.');
  };

  // Prevenir la visualización incorrecta de valores como 0.
  const formatValue = (value) => (value === null || value === undefined ? '' : value);

  if (loading) {
    return <p>Cargando ajustes...</p>;
  }

  return (
    <div>
      <h1>Ajustes</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Min Temperature:
          <input
            type="number"
            name="tempMin"
            value={formatValue(ajustesData.tempMin)}
            onChange={handleChange}
            disabled={!editMode}
          />
        </label>
        <label>
          Max Temperature:
          <input
            type="number"
            name="tempMax"
            value={formatValue(ajustesData.tempMax)}
            onChange={handleChange}
            disabled={!editMode}
          />
        </label>
        <label>
          Min Humidity:
          <input
            type="number"
            name="humyMin"
            value={formatValue(ajustesData.humyMin)}
            onChange={handleChange}
            disabled={!editMode}
          />
        </label>
        <label>
          Max Humidity:
          <input
            type="number"
            name="humyMax"
            value={formatValue(ajustesData.humyMax)}
            onChange={handleChange}
            disabled={!editMode}
          />
        </label>
        {!editMode ? (
          <button type="button" onClick={enableEditMode}>
            Modificar Ajustes
          </button>
        ) : (
          <button type="submit">Confirme los Cambios</button>
        )}
      </form>
      {message && <p style={{ color: 'blue', marginTop: '10px' }}>{message}</p>}
    </div>
  );
}

export default AjustesForm;
