import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/actions/userActions';
import { Link, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const location = useLocation
const SignIn = () => {
    const email = useRef(null);
    const password = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            dispatch(signIn(body)).then((response) => {
                if (response.payload.success) {
                    alert("Welcome" + response.payload.user.name);
                }
                // navigate("/");
            });
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

                    <button className='bt btn-secondary' type="submit">Login</button>
                    <GoogleOAuthProvider clientId="445761792247-dbcpi8hmi2o5mv47rjaam9l30eqq4uku.apps.googleusercontent.com">
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                console.log(credentialResponse);
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />;
                    </GoogleOAuthProvider>
                </form>
                <div className="button-wrapper">
                    <Link className="button cta-signup-button" to="/signup"></Link>
                    <p className='cta-text'>Become a user</p>

                </div>

            </div>
        </div>
    );
};

export default SignIn;
