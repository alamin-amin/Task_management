import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';


const Navbar = () => {
    const navigate = useNavigate();
    const logoutSubmit = (e) => {
        e.preventDefault();
        axios.post(`api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal('Success', res.data.message, 'success');
                navigate('/')
            }
        });
    }

    var authButton = '';
    if (!localStorage.getItem('auth_token')) {
        authButton = (
            < ul className="navbar-nav" >
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to="/register">Registation </Link>
                </li>
            </ul >
        );
    } else {
        authButton = (
            <li className="nav-item">
                <button type="button" onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm text-white">Logout</button>
            </li>
        );
    }

    let bgImage ={
        // backgroundColor:'#682E13',
        //  backgroundColor:'#D6A888',
         backgroundColor:'#FBD395'
    }
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-sm bg-light" style={bgImage}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">Task Management</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ marginLeft: "120px" }}>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/frontHome">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">Contact </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/About">About</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="#">Action</Link></li>
                                    <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/collections" tabindex="-1" aria-disabled="true">Category</Link>
                            </li>
                        </ul>
                        <div style={{ marginRight: "120px" }}>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>

                        <div style={{ marginRight: "30px" }}>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {authButton}
                            </ul>
                        </div>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar