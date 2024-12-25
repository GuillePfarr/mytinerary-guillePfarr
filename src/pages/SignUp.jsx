import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SignUp.css';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { signUp } from '../redux/actions/userActions';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

const SignUp = () => {
    const [countries, setCountries] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        image: "",
        country: ""
    });

    const dispatch = useDispatch();

    // Fetch countries on mount
    useEffect(() => {
        axios("https://restcountries.com/v3.1/all?fields=name").then(({ data }) =>
            setCountries(data.map((country) => country.name.common))
        );
    }, []);

    // Handle input changes
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, image, country } = formData;

        if (!name || !email || !password || !image || !country) {
            alert("All fields are required");
        } else {
            dispatch(signUp(formData));
        }
    };

    // Handle Google login
    const handleSubmitGoogle = async (data) => {
        const body = {
            name: data.given_name + " " + data.family_name,
            email: data.email,
            password: data.sub + import.meta.env.VITE_GG_KEY,
            image: data.picture,
            country: "Argentina",
        };

        dispatch(signUp(body));
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <label className="signup-label">
                    Name
                    <input
                        type="text"
                        name="name"
                        className="signup-input"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </label>
                <label className="signup-label">
                    Email
                    <input
                        type="email"
                        name="email"
                        className="signup-input"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </label>
                <label className="signup-label">
                    Password
                    <input
                        type="password"
                        name="password"
                        className="signup-input"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </label>
                <label className="signup-label">
                    Image
                    <input
                        type="text"
                        name="image"
                        className="signup-input"
                        value={formData.image}
                        onChange={handleInputChange}
                    />
                </label>
                <label className="signup-label">
                    Country
                    <select
                        name="country"
                        className="signup-input"
                        value={formData.country}
                        onChange={handleInputChange}
                    >
                        <option value="">Select a country</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </label>
                <button className="bt btn-secondary" type="submit">Registrarse</button>
                <GoogleOAuthProvider clientId="445761792247-dbcpi8hmi2o5mv47rjaam9l30eqq4uku.apps.googleusercontent.com">
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            const infoUser = jwtDecode(credentialResponse.credential);
                            handleSubmitGoogle(infoUser);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </GoogleOAuthProvider>
                <div className="button-wrapper">
                    <Link className="button cta-signup-button" to="/signin">Sign In</Link>
                    <p className="cta-text">Already registered?</p>
                </div>
            </form>
        </div>
    );
};

export default SignUp;

