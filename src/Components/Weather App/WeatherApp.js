
import React, { useState } from 'react';
import './WeatherApp.css';

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const Search = async (setWicon) => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
        return 0;
    }

    let api_key = "52db703c17232645c69a5cf4a7117ea6";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    
    let response = await fetch(url);
    let data = await response.json();
    
    let humidity = document.getElementsByClassName("humidity-percent");
    let wind = document.getElementsByClassName("wind_speed");
    let temperature = document.getElementsByClassName("weather-temp");
    let location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
    temperature[0].innerHTML = Math.floor(data.main.temp) + "°C";
    location[0].innerHTML = data.name;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(cloud_icon);
    }
    else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
        setWicon(cloud_icon);
    }
    else if (data.weather[0].icon == "03d" || data.weather[0].icon == "03n") {
        setWicon(drizzle_icon);
    }
    else if (data.weather[0].icon == "04d" || data.weather[0].icon == "04n") {
        setWicon(cloud_icon);
    }
    else if (data.weather[0].icon == "09d" || data.weather[0].icon == "09n") {
        setWicon(rain_icon);
    }
    else if (data.weather[0].icon == "10d" || data.weather[0].icon == "10n") {
        setWicon(rain_icon);
    }
    else if (data.weather[0].icon == "13d" || data.weather[0].icon == "13n") {
        setWicon(snow_icon);
    }
    else {
        setWicon(clear_icon);
    }
    
};

const WeatherApp = () => {
    const [wicon, setWicon] = useState(cloud_icon);

    const handleSearch = async () => {
        await Search(setWicon);
    };

    return (
        <div className='container'>
            <div className='top-bar'>
                <input type='text' className='cityInput' placeholder='Enter City Name' />
                <div className='search-icon' onClick={handleSearch}>
                    <img src={search_icon} alt='' />
                </div>
            </div>
            <div className='weather-image'>
                <img src={wicon} alt='' />
            </div>
            <div className='weather-temp'>24°C</div>
            <div className='weather-location'>London</div>
            <div className='data-container'>
                <div className='element'>
                    <img src={humidity_icon} alt='' className='icon' />
                    <div className='data'>
                        <div className='humidity-percent'>64%</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={wind_icon} alt='' className='icon' />
                    <div className='data'>
                        <div className='wind_speed'>18 km/h</div>
                        <div className='text'>Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
