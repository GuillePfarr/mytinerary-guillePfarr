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
  const [changesSaved, setChangesSaved] = useState(false); // Estado para mostrar confirmación.

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
        setLoading(false);
      }
    };

    fetchAjustes();

    // **NUEVO: Configurar actualizaciones automáticas cada 15 segundos**
    const intervalId = setInterval(() => {
      if (!editMode) {
        fetchAjustes(); // Solo actualiza si no estamos en modo edición.
      }
    }, 30000);

    return () => clearInterval(intervalId); // Limpieza del intervalo al desmontar.
    // **FIN DEL NUEVO BLOQUE**
  }, [editMode]); // Dependencia en editMode para pausar mientras se edita.

  // Manejar cambios en los campos del formulario.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAjustesData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario al servidor.
  const handleSubmit = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/ajuste/${ajustesData._id}`,
        ajustesData
      );
      setChangesSaved(true);
      alert('Valores modificados correctamente');
      setEditMode(false); // Desactivamos el modo edición tras guardar.
    } catch (error) {
      console.error('Error al actualizar los ajustes:', error);
      alert('Error al actualizar los ajustes');
    }
  };

  // Activar el modo edición.
  const enableEditMode = () => {
    alert('Ahora puede editar los valores');
    setEditMode(true);
    setChangesSaved(false); // Reiniciamos el estado de cambios guardados.
  };

  // Prevenir la visualización incorrecta de valores como 0.
  const formatValue = (value) => (value === null || value === undefined ? '' : value);

  if (loading) {
    return <p>Cargando ajustes...</p>;
  }

  return (
    <div>
      <h1>Ajustes</h1>
      <form>
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
          <button type="button" onClick={handleSubmit}>
            Confirme los Cambios
          </button>
        )}
      </form>
      {changesSaved && <p style={{ color: 'green' }}>Los cambios han sido guardados exitosamente.</p>}
    </div>
  );
}

export default AjustesForm;
