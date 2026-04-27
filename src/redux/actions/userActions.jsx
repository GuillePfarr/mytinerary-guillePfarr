import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:8080";

const saveToken = (token) => {
  if (token) localStorage.setItem("token", token);
};

export const cargarUsuario = createAction("cargar_usuario", (user) => {
  return { payload: user };
});

export const signUp = createAsyncThunk("create_user", async (body, thunkAPI) => {
  try {
    const response = await axios.post(`${API}/api/auth/signUp`, body);

    if (response.data.token) {
      saveToken(response.data.token);
    }

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data || { success: false, error: "Error en signUp" }
    );
  }
});

export const verifyEmail = createAsyncThunk(
  "verify_email",
  async (body, thunkAPI) => {
    try {
      const response = await axios.post(`${API}/api/auth/verify-email`, body);

      if (response.data.token) {
        saveToken(response.data.token);
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          success: false,
          error: "Error al verificar email",
        }
      );
    }
  }
);

export const resendVerification = createAsyncThunk(
  "resend_verification",
  async (body, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API}/api/auth/resend-verification`,
        body
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          success: false,
          error: "Error al reenviar código",
        }
      );
    }
  }
);

export const signIn = createAsyncThunk("logear", async (body, thunkAPI) => {
  try {
    const response = await axios.post(`${API}/api/auth/signIn`, body);
    saveToken(response.data.token);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data || { success: false, error: "Error en signIn" }
    );
  }
});

export const signInWithToken = createAsyncThunk(
  "signInWithToken",
  async (token, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API}/api/auth/signin/token`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return { user: response.data.user, token };
    } catch (error) {
      localStorage.removeItem("token");
      return thunkAPI.rejectWithValue(
        error.response?.data || { success: false, error: "Token inválido" }
      );
    }
  }
);

export const logout = createAction("reset", () => {
  localStorage.removeItem("token");
  return { payload: null };
});