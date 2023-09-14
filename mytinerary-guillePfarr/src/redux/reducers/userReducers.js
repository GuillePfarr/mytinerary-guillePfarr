import { cargarUsuario, signUp } from "../actions/userActions"



const initialState = {
    user: null
}

export const userReducer = createReducer(initialState, (builder) =>
    builder

        .addCase(cargarUsuario, (stateActual, action) => {
            return {
                ...stateActual,
                user: action.payload
            }
        }

        ).addCase(signUp.fulfilled, (stateActual, action) => {
            return {
                stateActual,
                user: action.payload
            }
        }))