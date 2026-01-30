// import React, { useRef } from 'react';
// import { useDispatch } from 'react-redux';
// import { signIn } from '../redux/actions/userActions';
// import { Link, useLocation } from 'react-router-dom';
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import { useNavigate } from 'react-router-dom';
// import './SignIn.css';
// import jwtDecode from 'jwt-decode';

// const location = useLocation
// const SignIn = () => {
//     const email = useRef(null);
//     const password = useRef(null);

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const aux = [email, password];
//         if (aux.some((campo) => !campo.current.value)) {
//             alert("All fields are required");
//         } else {
//             const body = {
//                 email: email.current.value,
//                 password: password.current.value,
//             };
           
//             // dispatch(signIn(body)).then((response) => {
//             //     if (response.payload.success) {
//             //         alert("Welcome" + response.payload.user.name);
//             //     }
//             //     navigate("/");
//             // });

//           dispatch(signIn(body)).then((response) => {
//                 if (response.payload.success) {
//                     alert("Welcome" + response.payload.user.name);
//                 }
//                 navigate("/");
//             });
//         }
//     };

//      const handleSubmitGoogle = async (data) => {
//          const body = {
//                 email: data.email,
//                 password: data.sub + import.meta.env.VITE_GG_KEY,
//             };
           
//             // dispatch(signIn(body)).then((response) => {
//             //     if (response.payload.success) {
//             //         alert("Welcome" + response.payload.user.name);
//             //     }
//             //     navigate("/");
//             // });
//              dispatch(signIn(body)).then((response) => {
//                 if (response.payload.success) {
//                     alert("Welcome" + response.payload.user.name);
//                 }
//                 navigate("/");
//             });

//            }

//     return (
        
//             <div className="signin-container">
//                 <form className="signin-form" onSubmit={handleSubmit}>
//                     <label className="signin-label">
//                         Email
//                         <input type="email" name="email" className="signin-input" ref={email} />
//                     </label>
//                     <label className="signin-label">
//                         Password
//                         <input type="password" name="password" className="signin-input" ref={password} />
//                     </label>

//                     <button className='bt btn-secondary' type="submit">Login</button>
//                     <GoogleOAuthProvider clientId="445761792247-dbcpi8hmi2o5mv47rjaam9l30eqq4uku.apps.googleusercontent.com">
//                         <GoogleLogin
//                             onSuccess={credentialResponse => {
                                
//                              const infoUser = jwtDecode(credentialResponse.credential)
//                             handleSubmitGoogle(infoUser)
//                             }}
//                             onError={() => {
//                                 console.log('Login Failed');
//                             }}
//                         />;
//                     </GoogleOAuthProvider>
//                 </form>
//                 <div className="button-wrapper">
//                     <Link className="button cta-signup-button" to="/signup"></Link>
//                     <p className='cta-text'>Become a user</p>

//                 </div>

           
//         </div>
//     );
// };

// export default SignIn;


import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/actions/userActions';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import './SignIn.css';
import jwtDecode from 'jwt-decode';

const SignIn = () => {
  const email = useRef(null);
  const password = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // (si no lo usás, podés borrarlo)

  const doLogin = async (body) => {
    const response = await dispatch(signIn(body));

    // Si el thunk falló, action puede venir rejected
    const payload = response?.payload;

    if (payload?.success) {
      // Guardado "a prueba de todo" (aunque el thunk ya lo haga)
      if (payload?.token) localStorage.setItem('token', payload.token);

      alert("Welcome " + payload.user.name);

      // Si venías de una ruta protegida, podrías volver ahí:
      // const from = location.state?.from?.pathname || "/";
      // navigate(from);

      //navigate("/devices"); es reemplazada por las dos que siguen
      const from = location.state?.from?.pathname || "/devices";
      navigate(from, { replace: true });

    } else {
      alert(payload?.error || "No se pudo iniciar sesión");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const aux = [email, password];
    if (aux.some((campo) => !campo.current.value)) {
      alert("All fields are required");
      return;
    }

    const body = {
      email: email.current.value,
      password: password.current.value,
    };

    doLogin(body);
  };

  const handleSubmitGoogle = (data) => {
    const body = {
      email: data.email,
      password: data.sub + import.meta.env.VITE_GG_KEY,
    };

    doLogin(body);
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <label className="signin-label">
          Email
          <input type="email" name="email" className="signin-input" ref={email} />
        </label>

        <label className="signin-label">
          Password
          <input type="password" name="password" className="signin-input" ref={password} />
        </label>

        <button className='bt btn-secondary' type="submit">Login</button>

        <GoogleOAuthProvider clientId="445761792247-dbcpi8hmi2o5mv47rjaam9l30eqq4uku.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const infoUser = jwtDecode(credentialResponse.credential);
              handleSubmitGoogle(infoUser);
            }}
            onError={() => {
              console.log('Login Failed');
              alert("Google login failed");
            }}
          />
        </GoogleOAuthProvider>
      </form>

      <div className="button-wrapper">
        <Link className="button cta-signup-button" to="/signup"></Link>
        <p className='cta-text'>Become a user</p>
      </div>
    </div>
  );
};

export default SignIn;



