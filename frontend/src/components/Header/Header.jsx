import React, { useState } from 'react';
import './header.css'; // Assuming you have a CSS file for additional styling

const Header = () => {
    const [classApplied, setClassApplied] = useState(false);

    const toggleClass = () => {
        setClassApplied(!classApplied);
    };

    const openPopup = () => {
        // Logic to open login/register popup
        console.log("Open login/register popup");
    };

    return (
        <div className="navbar-area" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 9999 }}>
            <div className="container1">
                <nav className={`navbar navbar-expand-lg navbar-light bg-light ${classApplied ? 'active' : ''}`}>
                    <a className="navbar-brand" href="/">
                        <img src="/logo.png" alt="logo" width="110px" />
                    </a>
                    <button className={'navbar-toggler button-login'} type="button" onClick={toggleClass} aria-controls="navbarNav" aria-expanded={classApplied} aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse  ${classApplied ? 'show' : ''}`} id="navbarNav">
                        <div className="others-option d-md-flex align-items-center"> {/* ml-auto to push this to the right */}
                            <div className="option-item login1">
                                <span className="d-block login-register" onClick={openPopup}>
                                    <i className="ri-user-line"></i>
                                    Login
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