// import { useEffect, useMemo, useState } from "react";
// import { devicesService } from "../../services/devicesService";

// export default function Devices() {
//   const [devices, setDevices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [busyId, setBusyId] = useState(null);
//   const [error, setError] = useState("");

//   // claim form
//   const [claimDeviceId, setClaimDeviceId] = useState("");
//   const [claimName, setClaimName] = useState("");

//   const isAuthed = useMemo(() => !!localStorage.getItem("token"), []);

//   async function loadDevices() {
//     setError("");
//     setLoading(true);
//     try {
//       const list = await devicesService.getDevices();
//       setDevices(list);
//     } catch (e) {
//       setError(e.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     if (isAuthed) loadDevices();
//     else {
//       setLoading(false);
//       setError("No hay token. Iniciá sesión primero.");
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   async function handleRelay(deviceId, state) {
//     setError("");
//     setBusyId(deviceId);
//     try {
//       await devicesService.setRelay25(deviceId, state);
//       // si tu backend no devuelve estado, igual refrescamos lista por si guardás lastState más adelante
//       // por ahora solo mostramos que fue ok:
//       setDevices((prev) =>
//         prev.map((d) => (d.deviceId === deviceId ? { ...d, relay25: state } : d))
//       );
//     } catch (e) {
//       setError(e.message);
//     } finally {
//       setBusyId(null);
//     }
//   }

//   async function handleClaim(e) {
//     e.preventDefault();
//     setError("");
//     setBusyId("CLAIM");
//     try {
//       await devicesService.claimDevice(claimDeviceId.trim(), claimName.trim());
//       setClaimDeviceId("");
//       setClaimName("");
//       await loadDevices();
//     } catch (e2) {
//       setError(e2.message);
//     } finally {
//       setBusyId(null);
//     }
//   }

//   if (loading) return <div style={{ padding: 16 }}>Cargando devices...</div>;

//   return (
//     <div style={{ padding: 16, maxWidth: 900, margin: "0 auto" }}>
//       <h2 style={{ marginBottom: 8 }}>Devices</h2>

//       {error && (
//         <div
//           style={{
//             marginBottom: 12,
//             padding: 10,
//             border: "1px solid #ffb4b4",
//             background: "#fff1f1",
//             borderRadius: 8,
//           }}
//         >
//           {error}
//         </div>
//       )}

//       <div
//         style={{
//           marginBottom: 18,
//           padding: 12,
//           border: "1px solid #ddd",
//           borderRadius: 10,
//         }}
//       >
//         <h3 style={{ marginTop: 0 }}>Claim device</h3>
//         <form onSubmit={handleClaim} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//           <input
//             value={claimDeviceId}
//             onChange={(e) => setClaimDeviceId(e.target.value)}
//             placeholder="deviceId (ej: esp32_01)"
//             style={{ padding: 10, minWidth: 220 }}
//           />
//           <input
//             value={claimName}
//             onChange={(e) => setClaimName(e.target.value)}
//             placeholder="name (opcional)"
//             style={{ padding: 10, minWidth: 220 }}
//           />
//           <button
//             type="submit"
//             disabled={busyId === "CLAIM" || !claimDeviceId.trim()}
//             style={{ padding: "10px 14px", cursor: "pointer" }}
//           >
//             {busyId === "CLAIM" ? "Claim..." : "Claim"}
//           </button>

//           <button
//             type="button"
//             onClick={loadDevices}
//             disabled={busyId === "CLAIM"}
//             style={{ padding: "10px 14px", cursor: "pointer" }}
//           >
//             Refrescar
//           </button>
//         </form>
//       </div>

//       {devices.length === 0 ? (
//         <div>No hay devices asociados a tu usuario todavía.</div>
//       ) : (
//         <div style={{ display: "grid", gap: 12 }}>
//           {devices.map((d) => (
//             <div
//               key={d._id || d.deviceId}
//               style={{
//                 padding: 14,
//                 border: "1px solid #ddd",
//                 borderRadius: 10,
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 gap: 12,
//                 flexWrap: "wrap",
//               }}
//             >
//               <div>
//                 <div style={{ fontWeight: 700 }}>
//                   {d.name || "(sin nombre)"}{" "}
//                   <span style={{ fontWeight: 400, opacity: 0.7 }}>— {d.deviceId}</span>
//                 </div>
//                 <div style={{ fontSize: 13, opacity: 0.75 }}>
//                   owner: {typeof d.owner === "string" ? d.owner : d.owner?._id || "(?)"}
//                 </div>
//                 {"relay25" in d && (
//                   <div style={{ marginTop: 6, fontSize: 13 }}>
//                     Relay25 UI-state: <b>{d.relay25}</b>
//                   </div>
//                 )}
//               </div>

//               <div style={{ display: "flex", gap: 10 }}>
//                 <button
//                   onClick={() => handleRelay(d.deviceId, "ON")}
//                   disabled={busyId === d.deviceId}
//                   style={{ padding: "10px 16px", cursor: "pointer" }}
//                 >
//                   {busyId === d.deviceId ? "Enviando..." : "Relay25 ON"}
//                 </button>
//                 <button
//                   onClick={() => handleRelay(d.deviceId, "OFF")}
//                   disabled={busyId === d.deviceId}
//                   style={{ padding: "10px 16px", cursor: "pointer" }}
//                 >
//                   {busyId === d.deviceId ? "Enviando..." : "Relay25 OFF"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { devicesService } from "../../services/devicesService";

export default function Devices() {
  const navigate = useNavigate();

  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyKey, setBusyKey] = useState(null); // ej: "esp32_01:ON" | "CLAIM"
  const [error, setError] = useState("");

  // claim form
  const [claimDeviceId, setClaimDeviceId] = useState("");
  const [claimName, setClaimName] = useState("");

  async function loadDevices() {
    setError("");
    setLoading(true);
    try {
      const list = await devicesService.getDevices();
      setDevices(list);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Si no hay token, no es "error": es que hay que loguearse
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin", { replace: true, state: { from: "/devices" } });
      return;
    }

    loadDevices();

    // Si apiClient dispara logout global (401), volvemos a login
    const onLogout = () => navigate("/signin", { replace: true, state: { from: "/devices" } });
    window.addEventListener("auth:logout", onLogout);
    return () => window.removeEventListener("auth:logout", onLogout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleRelay(deviceId, state) {
    setError("");
    const key = `${deviceId}:${state}`;
    setBusyKey(key);
    try {
      await devicesService.setRelay25(deviceId, state);
      setDevices((prev) =>
        prev.map((d) => (d.deviceId === deviceId ? { ...d, relay25: state } : d))
      );
    } catch (e) {
      setError(e.message);
    } finally {
      setBusyKey(null);
    }
  }

  async function handleClaim(e) {
    e.preventDefault();
    setError("");
    setBusyKey("CLAIM");
    try {
      await devicesService.claimDevice(claimDeviceId.trim(), claimName.trim());
      setClaimDeviceId("");
      setClaimName("");
      await loadDevices();
    } catch (e2) {
      setError(e2.message);
    } finally {
      setBusyKey(null);
    }
  }

  if (loading) return <div style={{ padding: 16 }}>Cargando devices...</div>;

  return (
    <div style={{ padding: 16, maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 8 }}>Devices</h2>

      {error && (
        <div
          style={{
            marginBottom: 12,
            padding: 10,
            border: "1px solid #ffb4b4",
            background: "#fff1f1",
            borderRadius: 8,
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          marginBottom: 18,
          padding: 12,
          border: "1px solid #ddd",
          borderRadius: 10,
        }}
      >
        <h3 style={{ marginTop: 0 }}>Claim device</h3>
        <form onSubmit={handleClaim} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            value={claimDeviceId}
            onChange={(e) => setClaimDeviceId(e.target.value)}
            placeholder="deviceId (ej: esp32_01)"
            style={{ padding: 10, minWidth: 220 }}
          />
          <input
            value={claimName}
            onChange={(e) => setClaimName(e.target.value)}
            placeholder="name (opcional)"
            style={{ padding: 10, minWidth: 220 }}
          />
          <button
            type="submit"
            disabled={busyKey === "CLAIM" || !claimDeviceId.trim()}
            style={{ padding: "10px 14px", cursor: "pointer" }}
          >
            {busyKey === "CLAIM" ? "Claim..." : "Claim"}
          </button>

          <button
            type="button"
            onClick={loadDevices}
            disabled={busyKey === "CLAIM"}
            style={{ padding: "10px 14px", cursor: "pointer" }}
          >
            Refrescar
          </button>
        </form>
      </div>

      {devices.length === 0 ? (
        <div>No hay devices asociados a tu usuario todavía.</div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {devices.map((d) => (
            <div
              key={d._id || d.deviceId}
              style={{
                padding: 14,
                border: "1px solid #ddd",
                borderRadius: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div style={{ fontWeight: 700 }}>
                  {d.name || "(sin nombre)"}{" "}
                  <span style={{ fontWeight: 400, opacity: 0.7 }}>— {d.deviceId}</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => handleRelay(d.deviceId, "ON")}
                  disabled={busyKey === `${d.deviceId}:ON` || busyKey === `${d.deviceId}:OFF`}
                  style={{ padding: "10px 16px", cursor: "pointer" }}
                >
                  {busyKey === `${d.deviceId}:ON` ? "Enviando..." : "Relay25 ON"}
                </button>

                <button
                  onClick={() => handleRelay(d.deviceId, "OFF")}
                  disabled={busyKey === `${d.deviceId}:ON` || busyKey === `${d.deviceId}:OFF`}
                  style={{ padding: "10px 16px", cursor: "pointer" }}
                >
                  {busyKey === `${d.deviceId}:OFF` ? "Enviando..." : "Relay25 OFF"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
