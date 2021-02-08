import React, { useState, useEffect } from 'react';

const Weather = ({city, country, temperature, description, wind, clouds, pressure, icon}) => {

    const [temp, setTemp] = useState([0, " °C"]);
    const [iconUrl, setIcon] = useState('');
    const [background, setBackground] = useState('');

    document.body.style = `background: url(${background}) no-repeat center center fixed;
                           -webkit-background-size: cover;
                           background-size: 100% 100%`;

    // Este useEffect es para recibir los datos de la temperatura y el icono,
    // Ya que si los coloco por defecto en el useState, gracias a la 
    // asincronía, va a devolver undefined. Tal vez haya una forma mejor 
    // de hacerlo
    useEffect(() => {
        setTemp([(Math.round(temperature * 100) / 100), " °C"]);
        changeBackground(icon);
    },[temperature, icon]);



    const changeBackground = (icon) => {
        if(icon){
            icon = parseInt(icon.slice(0,2));

            if(icon === 1){
                setBackground('https://i.gifer.com/Lx0q.gif');
                setIcon("fas fa-sun")
            } else if((icon >= 2 && icon <= 4) || icon === 50){
                setBackground('https://i.gifer.com/bFF.gif');
                if(icon ===  2){
                    setIcon("fas fa-cloud-sun")
                } else if(icon === 3){
                    setIcon("fas fa-cloud");
                } else if(icon === 4 || icon === 50){
                    setIcon("fas fa-cloud");
                }
            } else if(icon >= 9 && icon <= 11){
                setBackground('https://i.gifer.com/9Z0P.gif');
                if(icon ===  9){
                    setIcon("fas fa-cloud-showers-heavy")
                } else if(icon === 10){
                    setIcon("fas fa-cloud-sun-rain");
                } else if(icon === 11){
                    setIcon("fas fa-poo-storm");
                }
            } else if(icon === 13){
                setBackground('https://i.gifer.com/2ZOX.gif');
                setIcon("fas fa-snowflake")
            }
        }
    }

    const handleTemperature = () => {
        let value = 0;
        if(temp[1] === " °C"){
            value = temp[0] + 32;
            setTemp([value, " °F"]);
        } else {
            value = temp[0] - 32;
            setTemp([value, " °C"]);
        }
    }

    return(
        <div className="card">
            <h2 className="text-center">Wheather App</h2>
            <p className="text-center">{city}, {country}</p>
            <div className="row">
                <div className="col-sm-6">
                    <div className="text-center"><i className={iconUrl}></i></div>
                    <p className="temperature text-center text-black">{temp[0] + temp[1]}</p>
                </div>
                <div className="col-sm-6">
                   <ul>
                       <li className="text-center">
                            "{description}"
                       </li>
                       <li>
                            <div className="icon">
                                <i className="fas fa-wind"></i>
                            </div> 
                            Wind speed <span className="text-black">{wind} m/s</span>
                       </li>
                       <li>
                            <div className="icon">
                                <i className="fas fa-cloud"></i>    
                            </div> 
                            Clouds: <span className="text-black">{clouds}%</span>
                        </li>
                        <li>
                            <div className="icon">
                                <i className="fas fa-thermometer-three-quarters"></i>
                            </div> 
                            Pressure: <span className="text-black">{pressure} mb</span>
                        </li>
                   </ul>
                </div>
            </div>
            <div className="text-center">
                <button type="button" onClick={handleTemperature} className="change-unit">
                    Degrees °F/°C
                </button>
            </div>
        </div>
    )
}

export default Weather;