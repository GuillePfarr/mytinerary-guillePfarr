import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const cargarUsuario = createAction('cargar_usuario', (user) => {
    return {
        payload: user
    }

})

export const signUp = createAsyncThunk("create_user", async (body) => {
    try {
        const response = await axios.post("http://localhost:3000/api/auth/signUp", body)
        localStorage.setItem('token', response.data.token)
        console.log(response)
        return response.data.user

    } catch (error) {
        console.log(error)
    }


})