import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';



function App() {
  const API_KEY = "28877226e97527951f28e35074831e9a"
  const [city, setCity] = useState("Toronto")
  const [weather,setWeather] = useState(null)
  const [input, setInput] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const fetchWeather = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`;
    try{
      const respnse = await fetch(url);
      const weatherData = await respnse.json();

      if (weatherData.cod == "404"){
        setError("The city that you searched was not found");
        setWeather(null)
      }else{
        setError(null)
        setWeather(weatherData)
      }
    }catch(err){
      setError("there was an error with the network")
    }
  };


  const handleSearch = (e) => {
    e.preventDefault();
    if(input.trim() !==""){
      setCity(input.trim());
    }
  };

  const WeatherIcon = ({condition})=>{
    let defaultIcon = "/cloud.png"
    if(condition.includes("sun")) defaultIcon = "/sun.png";
    if(condition.includes("clear")) defaultIcon = "/sun.png";
    if(condition.includes("rain")) defaultIcon = "/rain.png";
    if(condition.includes("cloud")) defaultIcon = "/cloud.png";
    if(condition.includes("snow")) defaultIcon = "/snowy.png";
    return <img src={defaultIcon} alt="weather icon" width="100"/>;
  };


  return (
    <div className="app-container">
      <h1>Roberts Weatrher App</h1>
      <form className="search-box" onSubmit={handleSearch}>
        <input className="search-input" type="text" placeholder='Please enter a city name' value={input} onChange={(e) => setInput(e.target.value)}/>
        <button className="search-button" type='submit'>Srearch</button>
      </form>
      {error && <p style={{color: "red"}}>{error}</p>}
      {weather && weather.main && (
        <div className="weather-box">
          <h2 className="location">{weather.name}</h2>
          <WeatherIcon condition={weather.weather[0].main.toLowerCase()}/>
          <p className="temp">Temperature: {weather.main.temp}</p>
          <p className="description">Condition: {weather.weather[0].description}</p>
        </div>
        )}




    </div>
  );
}

export default App;
