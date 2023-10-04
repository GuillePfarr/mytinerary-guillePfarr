import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const cargarUsuario = createAction('cargar_usuario', (user) => {
    return {
        payload: user
    }

})

export const signUp = createAsyncThunk("create_user", async (body) => {
    try {
        const response = await axios.post(import.meta.env.VITE_API_URL + "/api/auth/signup", body)
        localStorage.setItem('token', response.data.token)
        
        return response.data

    } catch (error) {
        console.log(error)
    }
})

export const signIn = createAsyncThunk("logear", async (body) => {
    try {
        const response = await axios.post(import.meta.env.VITE_API_URL + "/api/auth/signin", body)
        localStorage.setItem('token', response.data.token)
       
        return response.data

    } catch (error) {
        console.log(error)
    }
})


export const signInWithToken = createAsyncThunk("signInWithToken", async (token) => {
    try {

        
        const response = await axios.post(import.meta.env.VITE_API_URL + "/api/auth/signIn/token", {}, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
                                                                                                            
        return {
           user: response.data.user,
            token: token
        }


    } catch (error) {
        console.log(error)
    }
})

export const logout = createAction("reset", () => {
     localStorage.removeItem('token')
     return{
     payload: null

}
})



