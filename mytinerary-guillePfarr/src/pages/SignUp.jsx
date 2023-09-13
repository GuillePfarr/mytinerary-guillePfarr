import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import GoogleLoginButton from '../../components/GoogleLoginButton/GoogleLoginButton.jsx';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { signUp } from "../../redux/userSlice.js";
import { current } from '@reduxjs/toolkit';

const SignUp = () => {

    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const photo = useRef(null);
    const country = useRef(null);
    const terms = useRef(null);

    useEffect(() => {
        axios("https://restcountries.com/v3.1/all?fields=name").then(({ data }) =>
            setCountries(data.map((country) => country.name.common))
        );
    }, []);

    const [data, setData] = useState({
        terms: false
    })

    const handleChangeData = (e) => {
        setData((prevState) => {
            return e.target.name === 'terms' ? { ...prevState, [e.target.name]: e.target.checked } : { ...prevState, [e.target.name]: e.target.value }
        })
    }

    const handleSubmitData = (e) => {
        e.preventDefault();
        const aux = [name, email, password, country];

        if (aux.some((campo) => !campo.current.value)) {
            alert("All fields are required");
        } else {
            const body = {};
            const lib = { name, email, password, photo, country };
            console.log(lib);
            for (const key in lib) {
                if (lib[key].current.value) {
                    body[key] = lib[key].current.value
                }
            }
            console.log(body);

                dispatch(signUp(body)).then((response) => {
                console.log(response);
                if (response.payload.success) {
                    alert("Thankyou for Register " + response.payload.user.name);
                    navigate(-1);
                }
                else { alert("Sign-up failed. Please check your register data.") };
            });
        }
    };

    return (
        <Container className="w-50 h-30 max-w-400px px-3 items-center mt-0">
            <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border max-w-400px mx-auto">
                <div className="p-2 mx-5 my-1 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
                    <h5>Register with</h5>
                </div>
                <Row className="px-3 m-1 sm:px-6 xl:px-12 align-middle">
                    <Col className="w-3/12 max-w-full px-1 ml-auto align-middle text-center">
                        <Button className="flex justify-center w-full px-6 py-2 mb-2 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-1.02 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover-opacity-0.75">
                            <svg xmlnsXlink="http://www.w3.org/1999/xlink32" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 64 64" height="32px" width="24px">
                                <g fillRule="evenodd" fill="none" strokeWidth="1" stroke="none">
                                    <g fillRule="nonzero" transform="translate(3.000000, 3.000000)">
                                        <circle r="29.4882047" cy="29.4927506" cx="29.5091719" fill="#3C5A9A"></circle>
                                        <path fill="#FFFFFF" d="M39.0974944,9.05587273 L32.5651312,9.05587273 C28.6886088,9.05587273 24.3768224,10.6862851 24.3768224,16.3054653 C24.395747,18.2634019 24.3768224,20.1385313 24.3768224,22.2488655 L19.8922122,22.2488655 L19.8922122,29.3852113 L24.5156022,29.3852113 L24.5156022,49.9295284 L33.0113092,49.9295284 L33.0113092,29.2496356 L38.6187742,29.2496356 L39.1261316,22.2288395 L32.8649196,22.2288395 C32.8649196,22.2288395 32.8789377,19.1056932 32.8649196,18.1987181 C32.8649196,15.9781412 35.1755132,16.1053059 35.3144932,16.1053059 C36.4140178,16.1053059 38.5518876,16.1085101 39.1006986,16.1053059 L39.1006986,9.05587273 L39.0974944,9.05587273 L39.0974944,9.05587273 Z"></path>
                                    </g>
                                </g>
                            </svg>
                        </Button>
                    </Col>
                    <Col className="w-3/12 max-w-full px-1 align-middle text-center">
                        <Button className="flex justify-center w-full px-6 py-2 mb-2 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-1.02 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover-opacity-0.75">
                            <svg xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 64 64" height="32px" width="24px">
                                <g fillRule="evenodd" fill="none" strokeWidth="1" stroke="none">
                                    <g fillRule="nonzero" fill="#000000" transform="translate(7.000000, 0.564551)">
                                        <path d="M40.9233048,32.8428307 C41.0078713,42.0741676 48.9124247,45.146088 49,45.1851909 C48.9331634,45.4017274 47.7369821,49.5628653 44.835501,53.8610269 C42.3271952,57.5771105 39.7241148,61.2793611 35.6233362,61.356042 C31.5939073,61.431307 30.2982233,58.9340578 25.6914424,58.9340578 C21.0860585,58.9340578 19.6464932,61.27947 15.8321878,61.4314159 C11.8738936,61.5833617 8.85958554,57.4131833 6.33064852,53.7107148 C1.16284874,46.1373849 -2.78641926,32.3103122 2.51645059,22.9768066 C5.15080028,18.3417501 9.85858819,15.4066355 14.9684701,15.3313705 C18.8554146,15.2562145 22.5241194,17.9820905 24.9003639,17.9820905 C27.275104,17.9820905 31.733383,14.7039812 36.4203248,15.1854154 C38.3824403,15.2681959 43.8902255,15.9888223 47.4267616,21.2362369 C47.1417927,21.4153043 40.8549638,25.1251794 40.9233048,32.8428307 M33.3504628,10.1750144 C35.4519466,7.59650964 36.8663676,4.00699306 36.4804992,0.435448578 C33.4513624,0.558856931 29.7884601,2.48154382 27.6157341,5.05863265 C25.6685547,7.34076135 23.9632549,10.9934525 24.4233742,14.4943068 C27.7996959,14.7590956 31.2488715,12.7551531 33.3504628,10.1750144"></path>
                                    </g>
                                </g>
                            </svg>
                        </Button>
                    </Col>
                    <GoogleLoginButton />
                    <Row className="relative w-full max-w-full px-3 mt-2 align-middle text-center shrink-0">
                        <p className="z-20 inline px-4 mb-2 font-semibold leading-normal bg-white text-sm text-slate-400">or</p>
                    </Row>
                </Row>
                <div className="flex-auto p-6 mx-5 my-2">
                    <Form role="form text-left" onSubmit={handleSubmitData}>
                        <Row>
                            <Form.Group className="mb-2">
                                <Form.Control name="name" ref={name} onChange={handleChangeData} value={data.name} aria-describedby="email-addon" aria-label="Name" placeholder="Name" className="text-sm focus-shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus-border-fuchsia-300 focus-bg-white focus-text-gray-700 focus-outline-none focus-transition-shadow" type="text" />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control name="email" ref={email} onChange={handleChangeData} value={data.email} aria-describedby="email-addon" aria-label="Email" placeholder="Email" className="text-sm focus-shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus-border-fuchsia-300 focus-bg-white focus-text-gray-700 focus-outline-none focus-transition-shadow" type="email" />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-2">
                                <Form.Control name="password" ref={password} onChange={handleChangeData} value={data.password} aria-describedby="password-addon" aria-label="Password" placeholder="Password" className="text-sm focus-shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus-border-fuchsia-300 focus-bg-white focus-text-gray-700 focus-outline-none focus-transition-shadow" type="password" />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control name="photo" ref={photo} onChange={handleChangeData} value={data.photo} aria-describedby="photo-addon" aria-label="Photo" placeholder="Photo" className="text-sm focus-shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus-border-fuchsia-300 focus-bg-white focus-text-gray-700 focus-outline-none focus-transition-shadow" type="text" />
                            </Form.Group>
                        </Row>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Control name="country" ref={country} as="select" onChange={handleChangeData} aria-describedby="country-addon" aria-label="Country" placeholder="Country">
                                <option value="">Country</option>
                                {countries.sort().map((country) => (
                                    <option key={`opt-country-${country}`} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <div className="min-h-6 pl-7 mb-0.5 block">
                            <Form.Check name="terms" ref={terms} onChange={handleChangeData} value={data.terms} type="checkbox" className="d-inline w-5 h-5 ease-soft -ml-7 rounded-1.4 checked:bg-gradient-to-tl checked:from-gray-900 checked:to-slate-800 after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-200 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all checked-border-0 checked-border-transparent checked-bg-transparent checked-after:opacity-100" id="terms" />
                            <Form.Label htmlFor="terms" className="d-inline mb-2 ml-1 font-normal cursor-pointer select-none text-sm text-slate-700"> I agree the <a className="bold text-secondary">Terms and Conditions</a>

                            </Form.Label>
                        </div>
                        <div className="text-center">
                            <Button type='submit' className="w-100 btn btn-primary btn-block px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all border-0" to="/signup">Sign up</Button>
                        </div>
                        <p className="mt-2 mb-0 leading-normal text-sm">Already have an account? <Link className="font-bold text-secondary" to="/signIn">Sign in</Link></p>
                    </Form>
                </div>
            </div>
        </Container>
    )
}

export default SignUp