import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AjustesForm() {
  const [ajustes, setAjustes] = useState({
    tempMin: '',
    tempMax: '',
    humidityMin: '',
    humidityMax: '',
  });

  useEffect(() => {
    // Fetch current ajustes data
    const fetchAjustes = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/api/ajustes/676e68bcce18f424bfd35d5a');
        setAjustes(response.data);
      } catch (error) {
        console.error('Error fetching ajustes:', error);
      }
    };
    fetchAjustes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAjustes({ ...ajustes, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(import.meta.env.VITE_API_URL + '/api/ajustes/676e68bcce18f424bfd35d5a', ajustes);
      alert('Ajustes actualizados correctamente');
    } catch (error) {
      console.error('Error updating ajustes:', error);
      alert('Error al actualizar ajustes');
    }
  };

  return (
    <div className="ajustes-form-container">
      <h1>Ajustes de Parámetros</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Temperatura Mínima:
          <input type="number" name="tempMin" value={ajustes.tempMin} onChange={handleInputChange} />
        </label>
        <label>
          Temperatura Máxima:
          <input type="number" name="tempMax" value={ajustes.tempMax} onChange={handleInputChange} />
        </label>
        <label>
          Humedad Mínima:
          <input type="number" name="humidityMin" value={ajustes.humidityMin} onChange={handleInputChange} />
        </label>
        <label>
          Humedad Máxima:
          <input type="number" name="humidityMax" value={ajustes.humidityMax} onChange={handleInputChange} />
        </label>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default AjustesForm;
