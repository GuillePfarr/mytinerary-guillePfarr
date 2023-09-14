import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './SignUp.css';
import { useDispatch } from 'react-redux';
import { signUp } from '../redux/actions/userActions'
const SignUp = () => {
    const [countries, setCountries] = useState([]);

    const dispatch = useDispatch()

    const name = useRef(null)
    const email = useRef(null)
    const password = useRef(null)
    const image = useRef(null)
    const country = useRef(null)


    useEffect(() => {
        axios("https://restcountries.com/v3.1/all?fields=name").then(({ data }) =>
            setCountries(data.map((country) => country.name.common))
        );
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const aux = [name, email, password, image, country];
        if (aux.some((campo) => !campo.current.value)) {
            alert("All fields are required");
        } else {
            const body = {
                name: name.current.value,
                email: email.current.value,
                password: password.current.value,
                image: image.current.value,
                country: country.current.value,
            };
            console.log(body)
            dispatch(signUp(body))
        }


    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <label className="signup-label">
                    Name
                    <input type="text" name="name" className="signup-input" ref={name} />
                </label>
                <label className="signup-label">
                    Email
                    <input type="text" name="email" className="signup-input" ref={email} />
                </label>
                <label className="signup-label">
                    Password
                    <input type="text" name="password" className="signup-input" ref={password} />
                </label>
                <label className="signup-label">
                    Image
                    <input type="text" name="image" className="signup-input" ref={image} />
                </label>
                <label className="signup-label">
                    Country
                    <select name="country" className="signup-input" ref={country}>
                        {countries.length > 0 &&
                            countries.map((country, index) => (
                                <option key={index} value={country}>
                                    {country}
                                </option>
                            ))}
                    </select>
                </label>
                <button className='bt btn-secondary' type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default SignUp;
