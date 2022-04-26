import { WeatherEntry } from '../../api/client';
import GoogleMaps from '../GoogleMaps/GoogleMaps';
import Weather from '../Weather/Weather';
import gif from "../../assets/gif/pointupindex.gif";
import "./MainSection.scss";

interface MainSectionInterface {
    data?: WeatherEntry
}

function MainSection( { data }: MainSectionInterface  ) {

    if(!data) {
        return <div className="gif">
                  <img src={gif} alt="" className="gif" />
                </div>
    }

  return (
    <div className={`main-section__${data.weather[0].main.toLocaleLowerCase()}`}>
      <div className="main-section">
          <GoogleMaps data={data} />
          <Weather data={data}/>
      </div>
    </div>

  )
}

export default MainSection