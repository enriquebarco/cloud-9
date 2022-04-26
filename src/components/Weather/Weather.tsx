import { WeatherEntry } from "../../api/client";
import sunnyIcon from "../../assets/icons/sunny.png";
import cloudyIcon from "../../assets/icons/overcast.png";
import rainyIcon from "../../assets/icons/rainy.png";
import snowIcon from "../../assets/icons/snowflake.png"
import thunderstormIcon from "../../assets/icons/thunderstorm.png";
import mistIcon from "../../assets/icons/mist.png";
import hazeIcon from "../../assets/icons/fog.png";
import smokeIcon from "../../assets/icons/smoke.png";
import dustIcon from "../../assets/icons/dust.png";
import tornadoIcon from "../../assets/icons/tornado.png";
import notFound from "../../assets/icons/page-not-found.png";
import windIcon from "../../assets/icons/wind.png";
import kiteIcon from "../../assets/icons/kitesurf.png";
import walkIcon from "../../assets/icons/walking.png";
import "./Weather.scss"


interface WeatherInterface {
  data: WeatherEntry
}

export default function Weather( { data }: WeatherInterface ) {

  const mainWeather = ( weather: string ) => {
    switch( weather ) {
      case "Clear": return <img src={sunnyIcon} alt="sunny icon" className="weather__icon" />
      case "Clouds": return <img src={cloudyIcon} alt="cloudy icon" className="weather__icon" />
      case "Rain": return <img src={rainyIcon} alt="rain icon" className="weather__icon" />
      case "Snow": return <img src={snowIcon} alt="snow icon" className="weather__icon" />
      case "Thunderstorm": return <img src={thunderstormIcon} alt="thunderstorm icon" className="weather__icon" />
      case "Drizzle": return <img src={rainyIcon} alt="rainy icon" className="weather__icon" />
      case "Mist": return <img src={mistIcon} alt="mist icon" className="weather__icon" />
      case "Haze": return <img src={hazeIcon} alt="haze icon" className="weather__icon" />
      case "Dust": return <img src={dustIcon} alt="dust icon" className="weather__icon" />
      case "Tornado": return <img src={tornadoIcon} alt="tornado icon" className="weather__icon" />
      case "Fog": return <img src={smokeIcon} alt="fog icon" className="weather__icon" />
      default: return <img src={notFound} alt="not found icon" className="weather__icon" />
    }
  }

  let sunrise = new Date(data.sys.sunrise).toTimeString().slice(3, 9);
  if(sunrise[0] === "0") sunrise = sunrise.slice(1);
  let sunset = new Date(data.sys.sunset).toTimeString().slice(3, 9);
  if(sunset[0] === "0") sunset = sunset.slice(1);


  return (
    <div className="weather">
      <h3 className="weather__title">The Weather in {data.name}!</h3>
      <div className="weather__time-container">
        <div className="weather__time-wrapper">
          <h4 className="weather__text-title">Sunrise</h4>
          <h4 className="weather__text">{sunrise}AM</h4>
        </div>
        <div className="weather__icon-container">
          {mainWeather(data.weather[0].main)}

        </div>
        <div className="weather__time-wrapper">
          <h4 className="weather__text-title">Sunset</h4>
          <h4 className="weather__text">{sunset}PM</h4>
        </div>
      </div>
        <div className="weather__temp-container">
          <h4 className="weather__text-title">Feels Like...</h4>
          <h3 className="weather__text-temp">{data.main.feels_like} ° F</h3>
        </div>
        <div className="weather__wind-container">
          <div className="weather__wind-wrapper">
            <h4 className="weather__text-title">Wind Speeds</h4>
            <div className="weather__wind-speed-container">
              <h3 className="weather__text-wind">{data.wind.speed} MPH</h3>
              <img src={windIcon} alt="wind icon" className="weather__icon weather__icon--secondary" />
            </div>
          </div>
          {data.wind.speed > 14 ?
            <div className="weather__wind-wrapper">
                <h4 className="weather__text-title">You can Fly A Kite!</h4>
                <img src={kiteIcon} alt="wind icon" className="weather__icon weather__icon--third" />
            </div>
            : 
            <div className="weather__wind-wrapper">
                <h4 className="weather__text-title">Light Winds</h4>
                <img src={walkIcon} alt="wind icon" className="weather__icon weather__icon--third" />
            </div>
          }
        </div>
    </div>
  );
}
