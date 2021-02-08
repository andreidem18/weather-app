import React, { useState, useEffect } from 'react';
import Loading from './Loading.js';
import Weather from './Weather.js';

const Request = () => {
    const [isLoading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [weather, setWeather] = useState({});

    const success = (position) => {
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=255a2683bd5ad3ec6d689e72383cce35`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                setIsError(false);
                console.log(data);
                setWeather({
                    city: data.name,
                    country: data.sys.country,
                    temperature: (data.main.temp - 273.15),
                    description: data.weather[0].description,
                    wind: data.wind.speed,
                    clouds: data.clouds.all,
                    pressure: data.main.pressure,
                    icon: data.weather[0].icon
                });
            }); 
    }

    const error = () => {
        setIsError(true);
        setLoading(true);
    }
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, error)
    }, []);

    return(
        <div>
            {(isLoading) ? <Loading/> : <Weather city={weather.city} country={weather.country} temperature={weather.temperature} description={weather.description} wind={weather.wind} clouds={weather.clouds} pressure={weather.clouds} icon={weather.icon}/>}
            <p className={(isError) ? "error-message text-center" : "error-message text-center d-none"}>
                it seems like we had a problem getting your ubication, check the permissions clicking <i className="fas fa-lock"></i> in your navigator
            </p>
        </div>
    )
}

export default Request;