import axios from "axios";

export interface WeatherEntry {
  clouds: { all: number };
  dt: number;
  main: {
    feels_like: number;
    humidity: number;
    temp_max: number;
    temp_min: number;
    temp: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
  sys: {
    country: string,
    id: number,
    sunrise: number | Date,
    sunset: number | Date,
    type: number
  }
  name: string;
  weather: {
    main: string;
    description: string;
  }[];
  wind: { speed: number };
}

const key = process.env.REACT_APP_WEATHER_API;

class Client {
  async getWeatherByZipCode(zipCode: string) {
    const res = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=${key}`
    );
    return res.data as WeatherEntry;
  }
}

export default new Client();
