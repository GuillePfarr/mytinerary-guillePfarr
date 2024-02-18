// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import axios from 'axios';

// function Vanguard() {
//   const [vanguards, setVanguards] = useState([]);
//   const [filter, setFilter] = useState('');
//   const [filteredVanguards, setFilteredVanguards] = useState([]);
//   const [noResults, setNoResults] = useState(false);

//   const handleFilterChange = (vanguard) => {
//     const filterText = vanguard.target.value.toLowerCase();

//     const filteredSensors = vanguards.filter((sensor) =>
//       vanguard.tempInt1.toString().startsWith(filterText) ||
//       vanguard.tempInt2.toString().startsWith(filterText)
//     );

//     setFilter(vanguard.target.value);
//     setFilteredVanguards(filteredVanguards);
//   };

//   useEffect(() => {
//     axios
//       .get(import.meta.env.VITE_API_URL + '/api/vanguard')
//             console.log()
//       .then((res) => {
//         setVanguards(res.data.response);
//         setFilteredVanguards(res.data.response);
//       })
//       .catch((error) => console.log(error));
//   }, []);

//   useEffect(() => {
//     setNoResults(filteredVanguards.length === 0);
//     window.scrollTo(0, 0);
//   }, [filteredVanguards]);

//   return (
//     <div className="sensors-container">
//       <h1 className='SensorsTitle'>Temperature Sensors</h1>
//       <input
//         className='inputSensors'
//         type="text"
//         placeholder="Filter by temperature..."
//         value={filter}
//         onChange={handleFilterChange}
//       />
//       {noResults && (
//         <h2 className="display-1 fw-bolder">No matches.</h2>
//       )}
//       <div className="cardsfield">
//         {filteredVanguards.map((vanguard, index) => (
//           <div className="card" key={index}>
//             <div className="card-body">
//               <h5 className="card-title">Temperature Sensor {index + 1}</h5>
//               <p>Temperature 1: {vanguard.tempInt1} °C</p>
//               <p>Temperature 2: {vanguard.tempInt2} °C</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Vanguard;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Vanguard() {
  const [vanguards, setVanguards] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + '/api/vanguard')
      .then((res) => {
        setVanguards(res.data.response);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setNoResults(vanguards.length === 0);
    window.scrollTo(0, 0);
  }, [vanguards]);

  return (
    <div className="sensors-container">
      <h1 className='SensorsTitle'>Temperature Sensors</h1>
      {noResults && (
        <h2 className="display-1 fw-bolder">No matches.</h2>
      )}
      <div className="cardsfield">
        {vanguards.map((vanguard) => (
          <div className="card" key={vanguard._id}>
            <div className="card-body">
              <h5 className="card-title">Temperature Sensor {vanguard._id}</h5>
              <p>Temperature 1: {vanguard.tempInt1} °C</p>
              {vanguard.tempInt2 && <p>Temperature 2: {vanguard.tempInt2} °C</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vanguard;
