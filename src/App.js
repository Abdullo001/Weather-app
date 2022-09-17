import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card/Card";
import { AiOutlineDelete } from "react-icons/ai";

import { BsBookmarkHeart } from "react-icons/bs";

function App() {
  const [city, setCity] = useState("Tashkent");
  const [weather, setWeather] = useState({});
  const [used, setUsed] = useState([]);
  const [save, setSave] = useState(
    JSON.parse(window.localStorage.getItem("cites"))||[]
  );

  useEffect(() => {
    if (city !== "") {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=25ccd97dd292e0ee187017a56a07c519&units=metric`
        )
        .then(function (response) {
          setWeather(response.data);
        })
        .catch( (error)=> {
          console.log(error);
        });
    }
  }, [city]);

  function deleteCity(item) {
    let array = [];
    save.forEach((el) => {
      if (el !== item) {
        array.push(el);
      }
    });

    setSave(array);
  }

  window.localStorage.setItem("cites", JSON.stringify(save));

  return (
    <div className="App">
      <h1 className="site-title"> Hi🖐 I am your Weather app</h1>

      <label>
        <input
          type="text"
          onKeyUp={(evt) => {
            if (evt.code === "Enter") {
              setCity(evt.target.value);
              setUsed([evt.target.value, ...used].splice(0, 5));
              evt.target.value = "";
            }
          }}
          placeholder="Search city ..."
        />
      </label>

      <ul className="last-search">
        {used?.map((e) => {
          return (
            <li key={e}>
              <button
                className="search-btn"
                data-button-id={e}
                onClick={(evt) => setCity(evt.target.dataset.buttonId)}
              >
                {e[0].toUpperCase() + e.substring(1)}
                <button
                  className="save-btn"
                  onClick={() => {
                    setSave([e, ...save].splice(0, 4));
                  }}
                >
                  <BsBookmarkHeart />
                </button>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="inner">
        {weather.name ? <Card data={weather} /> : null}

        <div className="saved-box">
          <h1 className="saved-title">Saved Cities</h1>
          <ul className="saved-list">
            {save?.map((e) => {
              return (
                <li key={e} className="saved-item">
                  <button
                    className="saved-btn"
                    data-button-id={e}
                    onClick={(evt) => setCity(evt.target.dataset.buttonId)}
                  >
                    {e[0].toUpperCase() + e.substring(1)}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => {
                      deleteCity(e);
                    }}
                  >
                    <AiOutlineDelete />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="ad">
        <h3>You may have your ad here </h3>
      </div>
    </div>
  );
}

export default App;
