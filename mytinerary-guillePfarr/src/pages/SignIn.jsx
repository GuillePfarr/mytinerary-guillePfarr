import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import GoogleLoginButton from '../../components/GoogleLoginButton/GoogleLoginButton.jsx';
import { signIn } from "../../redux/userSlice.js";

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
            dispatch(signIn(body)).then((response) => {
                console.log(response);
                if (response.payload.success) {
                    alert("Welcome " + response.payload.user.name);
                    navigate(-1);
                }
                else { alert("Sign-in failed. Please check your credentials.") };
            });
        }
    };
    return (
        <div className="w-full max-w-[800px] px-3 mx-auto flex-1 items-center shrink-0 mt-64">
            <Container className="w-50 h-30 max-w-400px px-3 items-center mt-0">
                <div className="p-2 m-1 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                    <div className="p-6 mx-5 my-1 mb-0 text-center align-middle bg-white border-b-0 rounded-t-2xl">
                        <h5>Login with</h5>
                    </div>
                    <Row className="px-3 m-1 sm:px-6 xl:px-12 align-middle">
                        <Col className="max-w-full px-1 ml-auto align-middle text-center">
                            <Button className="w-full px-6 py-2 mb-2 font-weight-bold text-center text-gray-200 text-uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover-scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover-bg-transparent hover-opacity-75">
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
                        <Col className="max-w-full px-1 align-middle text-center">
                            <Button className="w-full px-6 py-2 mb-2 font-weight-bold text-center text-gray-200 text-uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover-scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover-bg-transparent hover-opacity-75">
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
                        <Row className="relative w-full max-w-full px-3 mt-2 text-center shrink-0">
                            <p className="z-20 inline px-4 mb-2 font-weight-bold leading-normal bg-white text-sm text-slate-400">or</p>
                        </Row>
                    </Row>
                    <div className="flex-auto p-6 mx-5 my-2">
                        <Form role="form text-left" onSubmit={handleSubmit}>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    aria-describedby="email-addon"
                                    aria-label="Email"
                                    placeholder="Email"
                                    name="email"
                                    type="email"
                                    className="text-sm focus-shadow-soft-primary-outline leading-5.6 ease-soft w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus-fuchsia-300 focus-bg-white focus-text-gray-700 focus-outline-none focus-transition-shadow"
                                    ref={email}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    aria-describedby="password-addon"
                                    aria-label="Password"
                                    placeholder="Password"
                                    name='password'
                                    type="password"
                                    className="text-sm focus-shadow-soft-primary-outline leading-5.6 ease-soft w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus-fuchsia-300 focus-bg-white focus-text-gray-700 focus-outline-none focus-transition-shadow"
                                    ref={password}
                                />
                            </Form.Group>

                            <div className="text-center">
                                <Button className="w-100 btn btn-primary btn-block px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all border-0" type="submit">
                                    Sign in
                                </Button>
                            </div>
                            <p className="mt-4 mb-0 leading-normal text-sm">Don't have an account? <Link className="font-weight-bold text-secondary" to="/signup">Sign up</Link></p>
                        </Form>
                    </div>
                </div>
            </Container>
        </div>
    )
}
export default SignIn;