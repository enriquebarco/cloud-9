import React, { useEffect, useState } from "react";
import client, { WeatherEntry } from "../../api/client";
import BackButton from "../../components/BackButton/BackButton";
import CountDown from "../../components/CountDown/CountDown";
import Header from "../../components/Header/Header";
import MainSection from "../../components/MainSection/MainSection";

export default function HomePage() {

const [count, setCount] = useState(10);
const [weather, setWeather] = useState<WeatherEntry>();
const [zip, setZip] = useState("");
const [zips, setZips] = useState<string[]>([]);

useEffect(() => {

  // if you have location  services enabled on the browser, your weather should automatically load with this axios call. However, you will only commence the countdown to refresh data after you have entered a zip-code. Since this was not included in the scope of the project, I will comment out the code 
  // if(!zip) {
  //   navigator.geolocation.getCurrentPosition(function(location) {
  //     axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${apiKey}&units=metric`)
  //     .then((res) => setWeather(res.data))
  //     .catch((err) => console.log(err))
  //   });
  // }

  if(count > 0 && zip !== "") {
    setTimeout(() => setCount(count -1), 1000); 
  }

  if(count === 0) {
    client.getWeatherByZipCode(zip)
    .then((res) => {
      setWeather(res);
      setCount(10);
      console.log("updated!")
    })
    .catch((err) => console.log(err))
  }
},[count, zip])


const handleZipChange = (e: React.KeyboardEvent<HTMLInputElement>) => {

  if (e.key === "Enter" && e.target) {

    setZip((e.target as HTMLInputElement).value);

    setZips((prevArray) => {
      
      return [...prevArray, (e.target as HTMLInputElement).value]

    })

    client.getWeatherByZipCode((e.target as HTMLInputElement).value)
    .then((res) => {
      setWeather(res);
    })
    .catch(() => alert('Please enter a valid zip code!'))
  };
};

const handleBack = () => {
  const lastZip = zips[zips.length -2];
  
  setZip(lastZip);
  setZips((prevZips) => prevZips.slice(0, -1))

  client.getWeatherByZipCode(lastZip)
    .then((res) => {
      setWeather(res);
    })
    .catch(() => alert('Please enter a valid zip code!'))
}

  return (
    <>
      <Header handleZipChange={handleZipChange}/>
      <MainSection data={weather}/> 
      {zip !== "" &&
      <>
        <CountDown count={count} />
        <BackButton handleBack={handleBack}/>
      </>
      }
    </>
  );
}
