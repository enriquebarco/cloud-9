import React, { useState } from 'react';
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from "react-google-maps";
import { WeatherEntry } from '../../api/client';
import Icon from "../../assets/icons/person.png";
import WelcomeIcon from "../../assets/icons/welcome.png";
import { mapStyle } from '../../assets/styles/MapStyle';
import "./GoogleMaps.scss";



const api_key = process.env.REACT_APP_GOOGLE_API;

interface MapInterface {
    data: WeatherEntry
}

function Map( { data }: MapInterface ) {

    const[isOpen, setIsOpen] = useState(false);


    return (
        <GoogleMap 
           defaultZoom={10} 
           center={{lat:  data.coord.lat +.07, lng: data.coord.lon}}
           defaultOptions={{styles: mapStyle, disableDefaultUI: true, zoomControl: true,}} 
       >
           <Marker 
             position={{
               lat: data.coord.lat, 
               lng: data.coord.lon,
             }}
             onClick={() => {
                setIsOpen(true);
              }}
             icon={{
               url: Icon,
               scaledSize: new window.google.maps.Size(30, 30)
             }}
           />
           {isOpen && 
                <InfoWindow
                    position={{
                        lat: data.coord.lat, 
                        lng: data.coord.lon
                    }}
                    onCloseClick={() => {
                        setIsOpen(false);
                    }}
                    >
                    <div className="info-window__container">
                            <h3 className="info-window__title">Welcome to {data.name}!</h3>
                        <div className="info-window__wrapper">
                            <img src={WelcomeIcon} alt="welcome icon" className="info-window__icon" />
                            <h3 className="info-window__text">Current Temp: {data.main.temp}°F</h3>
                            <h3 className="info-window__text">Weather: {data.weather[0].description}</h3>
                        </div>
                       
                    </div>
                </InfoWindow>
           }
         
       </GoogleMap>
   );
  }

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function GoogleMaps( { data }: MapInterface) {

    return(
    <div className="google-maps__container" >
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${api_key}`}
          loadingElement={<div className="google-maps__element" />}
          containerElement={<div className="google-maps__element" />}
          mapElement={<div className="google-maps__element" />}
          data={data}
        />
    </div>
    )
  }