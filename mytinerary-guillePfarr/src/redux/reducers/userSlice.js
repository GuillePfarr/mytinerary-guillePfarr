import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAction } from "@reduxjs/toolkit";
// Función de utilidad para configurar el encabezado de autorización
const setAuthHeader = (token) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

export const loadUser = createAction('user/load', (user) => {
    return {
        payload: user
    }
})

export const signUp = createAsyncThunk("user/signUp", async (body) => {
    try {
        const response = await axios.post(
            "http://localhost:8090/api/auth/up",
            body
        );
        localStorage.setItem('token', response.data.token)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const signIn = createAsyncThunk("user/signIn", async (body) => {
    try {
        const response = await axios.post(
            "http://localhost:8090/api/auth/in",
            body
        );

        localStorage.setItem('token', response.data.token)
        
        return response.data
    } catch (error) {
        console.error(error);
        throw error;
    }
});

export const signInWithToken = createAsyncThunk(
    "user/signInWithToken",
    async (  ) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found in local storage");
            }
            const response = await axios.post("http://localhost:8090/api/auth/token", {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                })
            return {
                user: response.data.user,
                token: token
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export const logout = createAsyncThunk("user/logout", async () => {
    try {
        localStorage.removeItem("token");
        setAuthHeader(null);
        return null;
    } catch (error) {
        console.error(error);
        throw error;
    }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadUser, (stateActual, action) => {
                return {
                    ...stateActual,
                    user: action.payload
                }
            })
            .addCase(signUp.pending, (stateActual) => {
                return {
                    ...stateActual,
                    loading: true,
                    error: null,
                }
            })
            .addCase(signUp.fulfilled, (stateActual, action) => {
                return {
                    ...stateActual,
                    user: action.payload.user,
                    token: action.payload.token,
                    loading: false
                }
            })
            .addCase(signUp.rejected, (stateActual, action) => {
                return {
                    ...stateActual,
                    loading: false,
                    error: action.error.message,
                }
            })
            .addCase(signIn.fulfilled, (stateActual, action) => {
                return {
                    ...stateActual,
                    user: action.payload.user,
                    token: action.payload.token,
                    loading: false
                }
            })
            .addCase(signIn.pending, (stateActual) => {
                return {
                    ...stateActual,
                    loading: true,
                    error: null
                }
            })

            .addCase(signIn.rejected, (stateActual, action) => {
                return {
                    ...stateActual,
                    loading: false,
                    error: action.error.message,
                }
            })
            .addCase(signInWithToken.pending, (stateActual) => {
                return {
                    ...stateActual,
                    loading: true,
                    error: null
                }
            })
            .addCase(signInWithToken.fulfilled, (stateActual, action) => {
                return {
                    ...stateActual,
                    user: action.payload.user,
                    token: action.payload.token,
                    loading: false
                }
            })
            .addCase(signInWithToken.rejected, (stateActual, action) => {
                return {
                    ...stateActual,
                    loading: false,
                    error: action.error.message
                }
            })
            .addCase(logout.pending, (stateActual) => {
                return {
                    ...stateActual,
                    loading: true,
                    error: null
                }
            })
            .addCase(logout.fulfilled, (stateActual) => {
                return {
                    ...stateActual,
                    user: null,
                    token: null,
                    loading: false
                }
            })
            .addCase(logout.rejected, (stateActual, action) => {
                return {
                    ...stateActual,
                    loading: false,
                    error: action.error.message
                }
            });
    },
});

export default userSlice.reducer;