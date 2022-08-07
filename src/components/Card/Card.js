import "./Card.css";

const Card = ({ data }) => {

  let temp =Math.ceil(data.main.temp) ;


  return (
    <div className="card">
      <h1 className="cityName">
        {data.name}, <span className="country">{data?.sys?.country}</span>
      </h1>

      <span className="weather-type">{data.weather[0].description[0].toUpperCase() + data.weather[0].description.substring(1)}</span>

      <div className="box">
        <div className="box__pic">
          <img
            src={ `http://openweathermap.org/img/wn/${data?.weather[0]?.icon}.png`}
            alt=""
            className="box__img"
          />
          <span className="temp">
            {temp}<span>ºC</span>
          </span>
        </div>

        <div className="box__info">
          <div>
            Feels like: <span>{Math.ceil(data?.main?.feels_like)}ºC</span>
          </div>
          <div>
            Humidity: <span>{Math.ceil(data?.main?.humidity)}%</span>
          </div>
          <div>
            Wind: <span>{Math.ceil(data?.wind.speed)} mph  {data.wind.deg}º</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
