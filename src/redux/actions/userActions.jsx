// import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// export const cargarUsuario = createAction('cargar_usuario', (user) => {
//     return {
//         payload: user
//     }

// })

// export const signUp = createAsyncThunk("create_user", async (body) => {
//     try {
//         const response = await axios.post(import.meta.env.VITE_API_URL + "/api/auth/signup", body)
//         localStorage.setItem('token', response.data.token)
        
//         return response.data

//     } catch (error) {
//         console.log(error)
//     }
// })

// export const signIn = createAsyncThunk("logear", async (body) => {
//     try {
//         const response = await axios.post(import.meta.env.VITE_API_URL + "/api/auth/signin", body)
//         localStorage.setItem('token', response.data.token)
       
//         return response.data

//     } catch (error) {
//         console.log(error)
//     }
// })


// export const signInWithToken = createAsyncThunk("signInWithToken", async (token) => {
//     try {

        
//         const response = await axios.post(import.meta.env.VITE_API_URL + "/api/auth/signIn/token", {}, {
//             headers: {
//                 Authorization: "Bearer " + token
//             }
//         })
                                                                                                            
//         return {
//            user: response.data.user,
//             token: token
//         }


//     } catch (error) {
//         console.log(error)
//     }
// })

// export const logout = createAction("reset", () => {
//      localStorage.removeItem('token')
//      return{
//      payload: null

// }
// })



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
    saveToken(response.data.token);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data || { success: false, error: "Error en signUp" }
    );
  }
});

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

export const signInWithToken = createAsyncThunk("signInWithToken", async (token, thunkAPI) => {
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
});

export const logout = createAction("reset", () => {
  localStorage.removeItem("token");
  return { payload: null };
});
