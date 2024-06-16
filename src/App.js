import React,{useState}from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Weather from './components/Weather/Weather';
import './App.css';

const App = () => {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
        // Additional logic to update theme across the application
        const body = document.body;
        if (isDark) {
            body.classList.remove('dark-theme');
        } else {
            body.classList.add('dark-theme');
        }
    };

    return (
        <Router>
            <Header toggleTheme={toggleTheme} isDark={isDark}/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<About isDark={isDark}/>} />
                <Route path="/contact" element={<Contact isDark={isDark}/>} />
                <Route path="/weather" element={<Weather isDark={isDark}/>} />
            </Routes>
        </Router>
    );
};

export default App;
