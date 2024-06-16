import React from 'react';
import './About.css';

const About = ({isDark}) => {
    return (
        <div className={`about  ${isDark ? 'dark' : 'light'}`}>
            <h1>About</h1>
            <p>This is a weather application providing real-time weather data.</p>
        </div>
    );
};

export default About;
