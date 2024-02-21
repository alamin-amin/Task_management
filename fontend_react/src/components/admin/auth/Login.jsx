import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

const Login = () => {
    const navigate = useNavigate();
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    });
    const handleInput = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    }
    const loginSubmitFrom = (e) => {
        e.preventDefault();
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }
            axios.post(`api/login`, data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Success", res.data.message, "success");
                     navigate('/admin/allTask')
                } else if (res.data.status === 401) {
                    swal('Warning', res.data.message, 'warning');
                }
                else {
                    setLogin({ ...loginInput, error_list: res.data.validation_errors });
                }
            });
    }
    return (
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                    <div className="card-body">
                                        <form onSubmit={loginSubmitFrom}>
                                            <div className="form-floating mb-3">
                                                <input name='email' onChange={handleInput} value={loginInput.email} className="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                                                <label htmlFor="inputEmail">Email address</label>
                                                <span className='text-danger'>{loginInput.error_list.email}</span>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input name='password' onChange={handleInput} value={loginInput.password} className="form-control" id="inputPassword" type="password" placeholder="Password" />
                                                <label htmlFor="inputPassword">Password</label>
                                                <span className='text-danger'>{loginInput.error_list.password}</span>
                                            </div>
                                            <div className="form-check mb-3">
                                                <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                                <label className="form-check-label" htmlFor="inputRememberPassword">Remember Password</label>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <Link className="small" to="#">Forgot Password?</Link>
                                                <button type='submit' className='btn btn-primary'>Login</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"><Link to="/register">Need an account? Sign up!</Link></div>
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

export default Login