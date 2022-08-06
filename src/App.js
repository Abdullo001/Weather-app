import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState(" ");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    if (city !== " ") {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=25ccd97dd292e0ee187017a56a07c519&units=metric`
        )
        .then(function (response) {
          setWeather(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [city]);

  console.log(weather);


  return (
    <div className="App">
      <input
        type="text"
        onKeyUp={(evt) => {
          if (evt.code === "Enter") {
            setCity(evt.target.value);
          }
        }}
      />

      <h1 className="cityName">{weather.name}</h1>
      <p className="temp">
        Temperature: <span className="temp__data">{weather?.main?.temp}</span>
      </p>
    </div>
  );
}

export default App;
