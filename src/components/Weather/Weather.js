import React, { useState, useEffect } from 'react';
import './Weather.css';
import afternoon_Thunderstrom_heavy_rain from '../../assets/afternoon_Thunderstrom_heavy_rain.gif';
import afternoon_few_clouds from '../../assets/afternoon_few_clouds.jpeg';
import afternoon_scattered_clouds from "../../assets/afternoon_scattered_clouds.jpg";
import afternoon_light_snow from "../../assets/afternoon_light_snow.gif";
import day_clear_sky from "../../assets/day_clear_sky.jpg";
import day_few_clouds from "../../assets/day_few_clouds.jpeg";
import day_light_snow from "../../assets/day_light_snow.webp";
import day_scattered_clouds from '../../assets/day_scattered_clouds.jpg';
import day_shower_rainy from "../../assets/day_shower_rainy.gif";
import night_clear_sky from '../../assets/night_clear_sky.jpeg';
import night_few_clouds from '../../assets/night_few_clouds.jpg';
import night_light_snow from "../../assets/night_light_snow.jpeg";
import night_scattered_clouds from '../../assets/night_scattered_clouds.jpg';
import night_shower_rainy from '../../assets/night_shower_rainy.jpg';
import sunrise_clear_sky from '../../assets/sunrise_clear_sky.gif';
import sunrise_few_clouds from '../../assets/sunrise_few_clouds.jpg';
import sunrise_scattered_clouds from '../../assets/sunrise_scattered_clouds.jpg';
import sunset_clear_sky from '../../assets/sunset_clear_sky.gif';
import sunset_few_clouds from '../../assets/sunset_few_clouds.jpg';
import sunset_scattered_clouds from '../../assets/sunset_scattered_clouds.jpg';
import day_Thunderstrom_heavy_rain from '../../assets/day_Thunderstrom_heavy_rain.gif';

import {
    WiDaySunny,
    WiNightClear,
    WiSunrise,
    WiCloud,
    WiShowers,
    WiRain,
    WiThunderstorm,
    WiSnow,
    WiFog,
    WiHumidity
} from 'react-icons/wi';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind } from '@fortawesome/free-solid-svg-icons';

const weatherIcons = {
    Thunderstorm: <WiThunderstorm />,
    Drizzle: <WiShowers />,
    Rain: <WiRain />,
    Snow: <WiSnow />,
    Mist: <WiFog />,
    Smoke: <WiFog />,
    Haze: <WiFog />,
    Dust: <WiFog />,
    Fog: <WiFog />,
    Sand: <WiFog />,
    Ash: <WiFog />,
    Squall: <WiFog />,
    Tornado: <WiFog />,
    Clear: <WiDaySunny />,
    Clouds: <WiCloud />
};

const getImageByWeather = (description, isDay, isSunrise, isSunset, isAfternoon) => {
    if (isSunrise) {
        return {
            'clear sky': sunrise_clear_sky,
            'few clouds': sunrise_few_clouds,
            'scattered clouds': sunrise_scattered_clouds,
            'broken clouds': sunrise_scattered_clouds,
        }[description] || sunrise_clear_sky;
    }

    if (isSunset) {
        return {
            'clear sky': sunset_clear_sky,
            'few clouds': sunset_few_clouds,
            'scattered clouds': sunset_scattered_clouds,
            'broken clouds': sunset_scattered_clouds,
        }[description] || sunset_clear_sky;
    }

    if (isAfternoon) {
        return {
            'clear sky': day_clear_sky,
            'few clouds': afternoon_few_clouds,
            'scattered clouds': afternoon_scattered_clouds,
            'broken clouds': afternoon_scattered_clouds,
            'light rain': day_shower_rainy,
            'moderate rain': day_shower_rainy,
            'heavy rain': day_shower_rainy,
            'shower rain': day_shower_rainy,
            'rain': day_shower_rainy,
            'thunderstorm': afternoon_Thunderstrom_heavy_rain,
            'snow': afternoon_light_snow,
            'mist': day_scattered_clouds,
        }[description] || day_clear_sky;
    }

    const timeOfDay = isDay ? 'day' : 'night';
    const weatherMap = {
        'clear sky': timeOfDay === 'day' ? day_clear_sky : night_clear_sky,
        'few clouds': timeOfDay === 'day' ? day_few_clouds : night_few_clouds,
        'scattered clouds': timeOfDay === 'day' ? day_scattered_clouds : night_scattered_clouds,
        'broken clouds': timeOfDay === 'day' ? day_scattered_clouds : night_scattered_clouds,
        'light rain': timeOfDay === 'day' ? day_shower_rainy : night_shower_rainy,
        'moderate rain': timeOfDay === 'day' ? day_shower_rainy : night_shower_rainy,
        'heavy rain': timeOfDay === 'day' ? day_shower_rainy : night_shower_rainy,
        'shower rain': day_shower_rainy,
        'rain': timeOfDay === 'day' ? day_shower_rainy : night_shower_rainy,
        'thunderstorm': timeOfDay === 'day' ? day_Thunderstrom_heavy_rain : afternoon_Thunderstrom_heavy_rain,
        'snow': timeOfDay === 'day' ? day_light_snow : night_light_snow,
        'mist': day_scattered_clouds,
    };
    return weatherMap[description] || null;
};

const Weather = ({isDark}) => {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const [bgColor, setBgColor] = useState('#f0f0f0');

    const [citiesWeatherData, setCitiesWeatherData] = useState([]);





    useEffect(() => {
        const fetchCitiesWeatherData = async () => {
            const cities = ['Delhi', 'Kolkata', 'Chennai', 'Bangalore']; // Example cities
            const apiKey = 'a53f58f0f7e16769f48dc80c60e2713c';
            try {
                const promises = cities.map(async (city) => {
                    const response = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
                    );
                    if (!response.ok) throw new Error(`Weather data for ${city} not found`);
                    return response.json();
                });
                const data = await Promise.all(promises);
                setCitiesWeatherData(data);
            } catch (err) {
                console.error('Error fetching cities weather data:', err);
            }
        };

        fetchCitiesWeatherData();
    }, []);

    const fetchWeatherData = async () => {
        const apiKey = 'a53f58f0f7e16769f48dc80c60e2713c';
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
            if (!response.ok) throw new Error('Location not found');
            const data = await response.json();
            setWeatherData(data)


            setError('');
            setBgColor(getBgColor(data.main.temp));
            const updatedCities = citiesWeatherData.map((city, index) => ({
                ...city,
                selected: city.name === data.name
            }));
            setCitiesWeatherData(updatedCities);

        } catch (err) {
            setError(err.message);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (location.trim() === '') {
                setError('Location is required');
            } else {
                fetchWeatherData();
            }
        }
    };

    const getBgColor = (temp) => {
        if (temp <= 0) return '#dff5f0';
        if (temp <= 15) return '#d48e66';
        if (temp <= 30) return '#89d6c3';
        return '#000000';
    };


    const isDayTime = (date) => date.getHours() >= 6 && date.getHours() < 18;
    const isSunriseTime = (date, sunrise) => date.getHours() === new Date(sunrise * 1000).getHours();
    const isSunsetTime = (date, sunset) => date.getHours() === new Date(sunset * 1000).getHours();
    const isAfternoonTime = (date) => date.getHours() >= 12 && date.getHours() < 18;
    const textColor = isDayTime(new Date()) ? 'black' : 'white';

    return (
        <div className={`weather ${isDark ? 'dark' : 'light'}`}>
        <h1 className={`${isDark ? 'darkText' : 'lightText'}`}>Weather Information</h1>
        <div className="search-bar">
            <input
                type="text"
                placeholder="Enter city name or zip code"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <button onClick={fetchWeatherData}>Search</button>
        </div>

        {error && <p className="error">{error}</p>}
        <div className="cities-container">
            {citiesWeatherData.map((city, index) => (
                <div
                    key={index}
                    className={`weather-card ${city.selected ? 'selected' : ''}`}
                    style={{
                        backgroundImage: `url(${getImageByWeather(
                            city.weather[0].description,
                            isDayTime(new Date()),
                            isSunriseTime(new Date(), city.sys.sunrise),
                            isSunsetTime(new Date(), city.sys.sunset),
                            isAfternoonTime(new Date())
                        )})`,
                        backgroundColor: getBgColor(city.main.temp),
                        color: textColor
                    }}
                    onClick={() => {
                        setWeatherData(city);
                    }}
                >
                    <p>{city.name}</p>
                    <h2>{city.main.temp}°C</h2>
                    <div>{weatherIcons[city.weather[0].main]}</div>
                </div>
            ))}
        </div>

        {weatherData && (
            <div
                className={`weather-card ${isDark ? 'darkcard' : 'lightcard'}`}
                style={{
                    backgroundColor: bgColor,
                    backgroundImage: `url(${getImageByWeather(
                        weatherData.weather[0].description,
                        isDayTime(new Date()),
                        isSunriseTime(new Date(), weatherData.sys.sunrise),
                        isSunsetTime(new Date(), weatherData.sys.sunset),
                        isAfternoonTime(new Date())
                    )})`,
                    color: textColor,
                }}
            >
                <div className='card-top-info'>
                    <div>
                        <p>{new Date().toLocaleDateString()}</p>
                        <p className='text-time'>{new Date().toLocaleTimeString()}</p>
                    </div>
                    <div className='time-icons'>
                        {isDayTime(new Date()) ? <WiDaySunny /> : <WiNightClear />}
                        {isSunriseTime(new Date(), weatherData.sys.sunrise) && <WiSunrise />}
                    </div>
                </div>
                <div className='weather-center-details'>
                    <p>{weatherData.name}</p>

                    <h1 style={{ marginBottom: "0px", marginTop: "0px", fontFamily: "sans-serif", fontSize: "40px" }}>{weatherData.main.temp}°C</h1>
                    <p style={{ fontSize: "18px" }}>{weatherData.weather[0].description}</p>
                    <div className='weatherIcon'>{weatherIcons[weatherData.weather[0].main]}</div>
                </div>
                <div className='card-bottom-details'>
                    <p className='card-bottom-info'>
                        <span className="humidity-icon"><WiHumidity /></span>
                        <span>Humidity: {weatherData.main.humidity}%</span>
                    </p>
                    <p className='card-bottom-info'>
                        <FontAwesomeIcon icon={faWind} size="xs" />
                        <span> Wind Speed: {weatherData.wind.speed} m/s</span>
                    </p>
                </div>
            </div>
        )}
    </div>
);
};

export default Weather;
