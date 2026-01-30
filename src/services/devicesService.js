import apiClient from "./apiClient";

export const devicesService = {
  async getDevices() {
    const { data } = await apiClient.get("/api/devices");
    // tu backend probablemente devuelve {devices:[...]} o directamente [...]
    return Array.isArray(data) ? data : data.devices ?? [];
  },

  async claimDevice(deviceId, name) {
    const { data } = await apiClient.post("/api/devices/claim", { deviceId, name });
    return data;
  },

  async setRelay25(deviceId, state) {
    // state: "ON" | "OFF"
    const { data } = await apiClient.post(`/api/devices/${deviceId}/relays/25`, { state });
    return data;
  },
};
