import { cargarUsuario, logout, signUp } from "../actions/userActions"
import { createReducer } from "@reduxjs/toolkit";
import { signIn } from '../actions/userActions';
import { signInWithToken } from "../actions/userActions";


const initialState = {
    user: null,
    token: ""
}

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(cargarUsuario, (stateActual, action) => {
            return {
                ...stateActual,
                user: action.payload
            }
        }
        ).addCase(signUp.fulfilled, (stateActual, action) => {
            return {
                ...stateActual,
                user: action.payload,
                token: action.payload.token
            }
        }
        ).addCase(signIn.fulfilled, (stateActual, action) => {
            console.log(action.payload)
            return {
                ...stateActual,
                user: action.payload.user,
                token: action.payload.token
            }
        }
        ).addCase(signInWithToken, (stateActual, action) => {
            return {
                ...stateActual,
                user: action.payload.user,
                token: action.payload.token
            }
        }
        ).addCase(logout, (stateActual, action) => {
            return {
                ...stateActual,
                user: null,
                token: null
            }
        }
        )
}
)

export default userReducer