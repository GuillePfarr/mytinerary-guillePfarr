// import { cargarUsuario, logout, signUp } from "../actions/userActions"
// import { createReducer } from "@reduxjs/toolkit";
// import { signIn } from '../actions/userActions';
// import { signInWithToken } from "../actions/userActions";


// const initialState = {
//     user: null,
//     token: ""
// }

// const userReducer = createReducer(initialState, (builder) => {
//     builder
//         .addCase(cargarUsuario, (stateActual, action) => {
//             return {
//                 ...stateActual,
//                 user: action.payload
//             }
//         }
//         ).addCase(signUp.fulfilled, (stateActual, action) => {
//             return {
//                 ...stateActual,
//                 user: action.payload.user,
//                 token: action.payload.token
//             }
//         }
//         ).addCase(signIn.fulfilled, (stateActual, action) => {
            
//             return {
//                 ...stateActual,
//                 user: action.payload.user,
//                 token: action.payload.token
//             }
//         }
//         ).addCase(signInWithToken.fulfilled,  (stateActual, action) => {
            
//             return {
//                 ...stateActual,
//                 user: action.payload.user,
//                 token: action.payload.token
//             }
//         }
//         ).addCase(logout, (stateActual, action) => {
//             return {
//                 ...stateActual,
//                 user: null,
//                 token: null
//             }
//         }
//         )
// }
// )

// export default userReducer

import { createReducer } from "@reduxjs/toolkit";
import { cargarUsuario, logout, signUp, signIn, signInWithToken } from "../actions/userActions";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  error: null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cargarUsuario, (state, action) => {
      state.user = action.payload;
    })

    .addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    })
    .addCase(signUp.rejected, (state, action) => {
      state.error = action.payload?.error || "Error en signUp";
    })

    .addCase(signIn.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    })
    .addCase(signIn.rejected, (state, action) => {
      state.error = action.payload?.error || "Error en signIn";
    })

    .addCase(signInWithToken.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    })
    .addCase(signInWithToken.rejected, (state, action) => {
      state.user = null;
      state.token = null;
      state.error = action.payload?.error || "Token inválido";
    })

    .addCase(logout, (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    });
});

export default userReducer;
