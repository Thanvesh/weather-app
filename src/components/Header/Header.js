import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaSun, FaMoon } from 'react-icons/fa';

const Header = ({ toggleTheme, isDark }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    const toggleButton = () => {
        toggleTheme(); // This will toggle the theme state in App component
    };

    return (
        <header className={`header ${isDark ? 'light' : 'dark'}`}>
            <div className="logo" onClick={handleClick}>
                <FontAwesomeIcon icon="cloud" size="lg" style={{ color: "#214854" }} />
                <p>Weather App</p>
            </div>
            <button onClick={toggleButton} className={`toggle-button ${isDark?"lightButton":"darkbutton"}`} type="button">
                {isDark ? <FaSun /> : <FaMoon />}
            </button>

            <nav>
                <ul>
                    <li><Link to="/" className={isDark ? 'dark-link' : 'light-link'}>Home</Link></li>
                    <li><Link to="/about" className={isDark ? 'dark-link' : 'light-link'}>About</Link></li>
                    <li><Link to="/contact" className={isDark ? 'dark-link' : 'light-link'}>Contact</Link></li>
                    <li><Link to="/weather" className={isDark ? 'dark-link' : 'light-link'}>Weather</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
