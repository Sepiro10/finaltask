
import React from 'react';
import logo from './image.png';
import './logo.css';
const Header = () => {
    return (
        <header className="header">
            <img src={logo} alt="TaskBoss Logo" className="logo" />
            
        </header>
    );
};

export default Header;
