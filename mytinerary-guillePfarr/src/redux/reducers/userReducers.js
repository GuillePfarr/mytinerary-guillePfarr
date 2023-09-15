import { cargarUsuario, signUp } from "../actions/userActions"

const initialState = {
    user: null,
    token: ""
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
                ...stateActual,
                user: action.payload,
                token: action.payload.token
            }
        }
        ).addCase(signIn.fulfilled, (stateActual, action) => {
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
        )

)