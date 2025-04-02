import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../Services/authService';
import './header.css';

const Header = () => {
    const [classApplied, setClassApplied] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []); 

    const toggleClass = () => {
        setClassApplied(!classApplied);
    };

    const handleLoginLogout = async () => {
        if (isLoggedIn) {
            try {
                console.log(133);
                const response = await AuthService.logout();
                setIsLoggedIn(false); // Update the login state
                window.location.href = '/';
                
            } catch (error) {
                console.error("Logout failed:", error);
            }
        } else {
            // If user is not logged in, navigate to the login page
            navigate('/login');
        }
    };

    return (
        <div className="navbar-area" style={{ width: '100%' }}>
            <div className="container1">
                <nav className={`navbar navbar-expand-lg navbar-light bg-light ${classApplied ? 'active' : ''}`}>
                    <a className="navbar-brand" href="/">
                        <img src="/logo.png" alt="logo" width="110px" />
                    </a>
                    <button className={'navbar-toggler button-login'} type="button" onClick={toggleClass} aria-controls="navbarNav" aria-expanded={classApplied} aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${classApplied ? 'show' : ''}`} id="navbarNav">
                        <div className="others-option d-md-flex align-items-center">
                            <div className="option-item login1">
                                <span className="d-block login-register" onClick={handleLoginLogout}>
                                    <i className="ri-user-line"></i>
                                    {isLoggedIn ? "Logout" : "Login"}
                                </span>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Header;
