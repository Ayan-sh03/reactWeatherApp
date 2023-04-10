import { useState, useEffect } from "react";

import "./App.css";
import "./styles.css";
import Input from "./Components/Input";

function App() {
  // const [count, setCount] = useState(0)
  const APIKey = "190cd151645d4480001312dcc242b085";
  const [location, setLocation] = useState({});
  const [inputCity, setInputCity] = useState("Delhi");
  const [weather, setWeather] = useState({name:'',tempC:'',climate:'',feelsLike:0,humiDity:0,windSpeed:''});

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "4e5fb83547msh48a0d124e6c7decp1f2316jsn1ef2484dc18d",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  function handleInput(event) {
    console.log(event.target.value);
    setInputCity(event.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    fetch(`
  https://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&limit=1&appid=${APIKey}
  `)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setLocation({ name: data[0].name, lat: data[0].lat, lon: data[0].lon });
      });
  }

  useEffect(() => {
    // console.log(location.lat,location.lon)
    fetch(
      `https://weatherapi-com.p.rapidapi.com/current.json?q=${location.lat}%2C${location.lon}`,
      options
    )
    .then((response) => response.json())
    .then((response) => {
      if (!response.current || !response.location) {
        console.log('Invalid response:', response);
        return;
      }
    
      const { current, location } = response;
      const { wind_kph, temp_c, humidity, feelslike_c } = current;
      const { name } = location;
      const clim = current.condition.text;
      
      setWeather({
        name: name,
        tempC: temp_c,
        climate: clim,
        feelsLike: feelslike_c,
        humiDity: humidity,
        windSpeed: wind_kph
      });
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
    
  },[location]);

  return (
    <div className="App">
      <div className="grid">
        <div className="row">
          <form className="input" onSubmit={handleSubmit}>
            <input
              name="city-name"
              placeholder="Enter City Name"
              id="city-name"
              className="cityName"
              onChange={handleInput}
            />
            <button type="submit" className="search-button">
              <i class="fa fa-search"></i>
            </button>
          </form>
        </div>
        <div className="row">
          <div className="column weather">
            <div>
              <h2 className="weather-name">{weather.name}</h2>
              <h1 className="weather-temp">{weather.tempC} &#8451;</h1>
            </div>
          </div>
          <div className="column weather ">
            <div className="weather-type">{weather.climate}</div>
          </div>
        </div>
        <div className="row">
          <div className="column ">
            <ul className="weather-details">
              <li>Feels Like  {weather.feelsLike} &#8451;</li>
              <li>Humidity {weather.humiDity}</li>
              <li>Wind Speed  {weather.windSpeed} km/h</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
