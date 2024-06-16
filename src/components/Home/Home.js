import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Painting from '../../assets/painting.jpg'

const Home = () => {
    const title = "Welcome to the Weather App";

    return (
        <div className="home" style={{backgroundImage:`url(${Painting})`}} >
            <h1>
                {title.split('').map((char, index) => (
                    <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </h1>
            <p className="animated-p">Check out the current weather status with animations!</p>
            <Link to="/weather"><button className="enter-btn animated-btn">Enter</button></Link>
        </div>
    );
};

export default Home;
