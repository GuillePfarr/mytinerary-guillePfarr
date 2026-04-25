import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { devicesService } from "../../services/devicesService";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function timeAgo(dateValue) {
  if (!dateValue) return "-";

  const date = new Date(dateValue);
  const diffMs = Date.now() - date.getTime();

  if (Number.isNaN(diffMs)) return "-";

  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return `hace ${diffSec}s`;

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `hace ${diffMin} min`;

  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `hace ${diffHours} h`;

  const diffDays = Math.floor(diffHours / 24);
  return `hace ${diffDays} días`;
}

const RELAY_IDS = ["1", "2", "3", "4"];

export default function Devices() {
  const navigate = useNavigate();

  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyKey, setBusyKey] = useState(null);
  const [error, setError] = useState("");

  const [claimDeviceId, setClaimDeviceId] = useState("");
  const [claimCode, setClaimCode] = useState("");
  const [claimName, setClaimName] = useState("");

  async function loadDevices(showLoader = true) {
    if (showLoader) setLoading(true);
    setError("");

    try {
      const list = await devicesService.getDevices();
      setDevices(list);
    } catch (e) {
      setError(e.message || "Error al cargar devices");
    } finally {
      if (showLoader) setLoading(false);
    }
  }

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/signin", { replace: true, state: { from: "/devices" } });
    return;
  }

  const onLogout = () => {
    navigate("/signin", { replace: true, state: { from: "/devices" } });
  };

  loadDevices();

  const intervalId = setInterval(() => {
    loadDevices(false);
  }, 15000);

  window.addEventListener("auth:logout", onLogout);

  return () => {
    clearInterval(intervalId);
    window.removeEventListener("auth:logout", onLogout);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  async function handleRelay(deviceId, relayId, state) {
    setError("");
    const key = `${deviceId}:${relayId}:${state}`;
    setBusyKey(key);

    try {
      await devicesService.setRelay(deviceId, relayId, state);

      const result = await waitForRelayState(deviceId, relayId, state, 10, 500);

      if (!result.synced) {
        setError(
          `El comando del relay ${relayId} se envió, pero la UI todavía no confirmó el nuevo estado. Estado actual: ${
            result.realState || "DESCONOCIDO"
          }`
        );
      } else {
        setError("");
      }
    } catch (e) {
      setError(e.message || `Error al enviar comando al relay ${relayId}`);
    } finally {
      setBusyKey(null);
    }
  }

  async function handleClaim(e) {
    e.preventDefault();
    setError("");
    setBusyKey("CLAIM");

    try {
      await devicesService.claimDevice(
        claimDeviceId.trim(),
        claimCode.trim(),
        claimName.trim()
      );

      setClaimDeviceId("");
      setClaimCode("");
      setClaimName("");

      await loadDevices(false);
    } catch (e) {
      setError(e.message || "Error al reclamar device");
    } finally {
      setBusyKey(null);
    }
  }

  if (loading) return <div style={{ padding: 16 }}>Cargando devices...</div>;

  return (
    <div style={{ padding: 16, maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 8 }}>Devices</h2>

      <div style={{ marginBottom: 12, fontSize: 12, opacity: 0.7 }}>
        Actualización automática cada 15 segundos
      </div>

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
            value={claimCode}
            onChange={(e) => setClaimCode(e.target.value)}
            placeholder="claimCode"
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
            disabled={
              busyKey === "CLAIM" ||
              !claimDeviceId.trim() ||
              !claimCode.trim()
            }
            style={{ padding: "10px 14px", cursor: "pointer" }}
          >
            {busyKey === "CLAIM" ? "Claim..." : "Claim"}
          </button>

          <button
            type="button"
            onClick={() => loadDevices()}
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
                display: "grid",
                gap: 12,
              }}
            >
              <div>
  <div style={{ fontWeight: 700 }}>
    {d.name || "(sin nombre)"}{" "}
    <span style={{ fontWeight: 400, opacity: 0.7 }}>
      — {d.deviceId}
    </span>
  </div>

  <div style={{ marginTop: 4, fontSize: 13 }}>
    Estado:{" "}
    <b style={{ color: d.online ? "green" : "crimson" }}>
      {d.online ? "ONLINE" : "OFFLINE"}
    </b>
  </div>

  {d.lastSeen && (
    <div style={{ marginTop: 4, fontSize: 12, opacity: 0.7 }}>
      Último reporte: {timeAgo(d.lastSeen)}
    </div>
  )}

  <div style={{ marginTop: 4, fontSize: 12, opacity: 0.7 }}>
    Modelo: {d.model || "-"} | FW: {d.firmwareVersion || "-"} | HW:{" "}
    {d.hardwareVersion || "-"}
  </div>
</div>



{d.lastSnapshot && (
  <div
    style={{
      padding: 12,
      border: "1px solid #e5e5e5",
      borderRadius: 8,
      background: "#fafafa",
      display: "grid",
      gap: 6,
    }}
  >
    <div style={{ fontWeight: 700 }}>Estado reportado</div>

    <div>
      Temp local: <b>{d.lastSnapshot.tempLocal ?? "-"}</b> °C | Hum local:{" "}
      <b>{d.lastSnapshot.humLocal ?? "-"}</b> %
    </div>

    <div>
      Temp remota: <b>{d.lastSnapshot.tempRemote ?? "-"}</b> °C | Hum remota:{" "}
      <b>{d.lastSnapshot.humRemote ?? "-"}</b> %
    </div>

    <div>
      Límites: tmax <b>{d.lastSnapshot.tmax ?? "-"}</b> / tmin{" "}
      <b>{d.lastSnapshot.tmin ?? "-"}</b>
    </div>

    <div>
      Fuente hora: <b>{d.lastSnapshot.timeSource ?? "-"}</b> | Error:{" "}
      <b>{d.lastSnapshot.errorCode ?? "-"}</b>
    </div>

    <div style={{ fontSize: 12, opacity: 0.75 }}>
      Snapshot: {d.lastSnapshot.timestamp || "-"}
    </div>
  </div>
)}

              {RELAY_IDS.map((relayId) => {
                const relayState = d.relayStates?.[relayId] || "DESCONOCIDO";
                const relayBusy =
                  busyKey === `${d.deviceId}:${relayId}:ON` ||
                  busyKey === `${d.deviceId}:${relayId}:OFF`;

                return (
                  <div
                    key={relayId}
                    style={{
                      padding: 10,
                      border: "1px solid #eee",
                      borderRadius: 8,
                    }}
                  >
                    <div style={{ marginBottom: 6, fontSize: 14 }}>
                      Relay {relayId} estado real: <b>{relayState}</b>
                    </div>

                    <div style={{ display: "flex", gap: 10 }}>
                      <button
                        onClick={() => handleRelay(d.deviceId, relayId, "ON")}
                        disabled={relayBusy}
                        style={{ padding: "8px 14px", cursor: "pointer" }}
                      >
                        {busyKey === `${d.deviceId}:${relayId}:ON`
                          ? "Enviando..."
                          : `Relay ${relayId} ON`}
                      </button>

                      <button
                        onClick={() => handleRelay(d.deviceId, relayId, "OFF")}
                        disabled={relayBusy}
                        style={{ padding: "8px 14px", cursor: "pointer" }}
                      >
                        {busyKey === `${d.deviceId}:${relayId}:OFF`
                          ? "Enviando..."
                          : `Relay ${relayId} OFF`}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}