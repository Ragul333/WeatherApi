import axios from 'axios';
import './App.css';
import CurrentDayCard from './components/CurrentDayCard';
import CurrentDayDetails from './components/CurrentDayDetails';
import ForecastCard from './components/ForecastCard';
import { useEffect, useState } from 'react';
import moment from 'moment';


function App() {
  const [place, setPlace] = useState('');
  const [submit, Onsubmit] = useState(false);
  const [error, isError] = useState(false);
  const [data, setData] = useState([]);
  const [forecastData, setForecastData] = useState([]);

  async function getData(place) {
    try {
      const res = await axios.get(`http://api.weatherapi.com/v1/current.json?key=0106f784817d49fc8d461457231407&q=${place}&aqi=yes`);
      setData(res?.data);
      console.log(res?.data);
      Onsubmit(false);
      isError(false);
    } catch (error) {
      isError(true);
    }
  }
  async function getForecastData(place) {
    try {
      const res = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=0106f784817d49fc8d461457231407&q=${place}&days=6&aqi=yes`);
      setForecastData(res?.data?.forecast?.forecastday);
      Onsubmit(false);
      isError(false);
    } catch (error) {
      isError(true);
    }
  }
  useEffect(() => {
    if (submit) {
      getData(place);
      getForecastData(place);
    }
    if (!place && !submit) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        console.log("Geolocation not supported");
      }

      function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        getData(`${latitude},${longitude}`);
        getForecastData(`${latitude},${longitude}`);
      }

      function error() {
        console.log("Unable to retrieve your location");
      }
    }
  }, [submit])
  return (
    <div className='main'>
      <div className='current-day-card'>
        {
          Object.keys(data)?.length > 0 ? <>
            <CurrentDayCard error={error} data={data} setPlace={setPlace} Onsubmit={Onsubmit} />
          </> : 'Loading.....'
        }

      </div>
      {
        error ? <></> :
          <div className='details-and-forecast'>
            <p className='details-and-forecast-title' style={{ marginTop: '1rem' }}>This week</p>
            <div className='forecast'>
              {
                forecastData?.length > 0 ? forecastData?.map((data, index) => {
                  return index > 0 ? <ForecastCard index={index} day={moment(data?.date).format('dddd')} img={data?.day?.condition?.icon} maxTemp={data?.day?.maxtemp_c} minTemp={data?.day?.mintemp_c} /> : ""
                }) : 'Loading...'
              }
            </div>
            <p className='details-and-forecast-title'>Highlights</p>
            <div className='details'>
              {
                Object.keys(data)?.length > 0 ? <>
                  <CurrentDayDetails title={'Humidity'} value={data?.current?.humidity} status={''} />
                  <CurrentDayDetails title={'Wind Speed'} value={data?.current?.wind_kph + " kph"} status={''} />
                  <CurrentDayDetails title={'Wind Direction'} value={data?.current?.wind_dir} status={''} />
                  <CurrentDayDetails title={'UV'} value={data?.current?.uv} status={''} />
                  <CurrentDayDetails title={'Current Condition'} value={data?.current?.condition?.text} status={''} />
                  <CurrentDayDetails title={'Air Quality'} value={(data?.current?.air_quality?.co)?.toFixed(2) + " co"} status={''} />
                </> : 'Loading...'
              }
            </div>
          </div>
      }
    </div>
  );
}

export default App;
