import React from 'react';
import './Contact.css';

const Contact = ({isDark}) => {
    return (
        <div  className={`contact  ${isDark ? 'dark' : 'light'}`}>
            <h1>Contact</h1>
            <p>Name: Radandi Thanvesh Kumar</p>
            <p>Fullstack Developer</p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/thanveshr" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/thanveshr</a></p>
            <p>Phone: 6302775385</p>
            <p>Email: radandithanvesh@gmail.com</p>
        </div>
    );
};

export default Contact;
