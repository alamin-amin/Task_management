

import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';


const Register = () => {
    const navigate = useNavigate();
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });

    }
    const registerSubmitFrom = (e) => {

        e.preventDefault();
        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/register`, data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal('Success', res.data.message, 'success');
                    navigate('/')
                } else {
                    setRegister({ ...registerInput, error_list: res.data.validation_errors });
                }
            });
        });      
    }

    return (
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-7">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Account</h3></div>
                                    <div className="card-body">
                                        <form onSubmit={registerSubmitFrom}>
                                            <div className="row mb-3">
                                                <div className="col-md-12">
                                                    <div className="mb-3 mb-md-0">
                                                        <label htmlFor="name"> Name : </label>
                                                        <input type="text" name='name' onChange={handleInput} value={registerInput.name} className="form-control" id="inputFirstName" placeholder='Type your name'/>
                                                        <span className='text-danger'>{registerInput.error_list.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" mb-3">
                                                <label htmlFor="inputEmail">Email address : </label>
                                                <input type="email" name='email' onChange={handleInput} value={registerInput.email} className="form-control" id="inputEmail" placeholder='Email Address' />
                                                <span className='text-danger'>{registerInput.error_list.email}</span>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-12">
                                                    <div className=" mb-3 mb-md-0">
                                                        <label htmlFor="inputPassword">Password : </label>
                                                        <input type="password" name='password' onChange={handleInput} value={registerInput.password} className="form-control" id="inputPassword" placeholder='Password'/>
                                                        <span className='text-danger'>{registerInput.error_list.password}</span>
                                                    </div>
                                                </div>
                                                {/* <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" id="inputPasswordConfirm" type="password" placeholder="Confirm password" />
                                                        <label htmlFor="inputPasswordConfirm">Confirm Password</label>
                                                    </div>
                                                </div> */}
                                            </div>
                                            <div className="mt-4 mb-0 col-md-12">
                                                {/* <button type='submit' className="d-grid"><Link className="btn btn-primary btn-block" to="login.html">Create Account</Link></button> */}
                                                <button type='submit' className='btn btn-primary'>Create Account</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"><Link to="/">Have an account? Go to login</Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Register