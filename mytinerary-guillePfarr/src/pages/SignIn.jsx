import React, { useRef } from 'react';
import { useDispatch } from 'react-redux'; // Importa useDispatch
import { signIn } from '../redux/actions/userActions';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import './SignIn.css';

const SignIn = () => {
    const email = useRef(null);
    const password = useRef(null);

    const dispatch = useDispatch(); // Obtiene el dispatch

    const handleSubmit = (e) => {
        e.preventDefault();
        const aux = [email, password];
        if (aux.some((campo) => !campo.current.value)) {
            alert("All fields are required");
        } else {
            const body = {
                email: email.current.value,
                password: password.current.value,
            };
            console.log(body);

            // Usa dispatch para despachar la acción
            dispatch(signIn(body));
        }
    };

    return (
        <div>
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

                    <button className='bt btn-secondary' type="submit">Registrarse</button>
                    <GoogleOAuthProvider clientId="445761792247-dbcpi8hmi2o5mv47rjaam9l30eqq4uku.apps.googleusercontent.com">
                        <GoogleLogin />
                    </GoogleOAuthProvider>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
