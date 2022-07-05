import React, { useState } from 'react'
import axios from 'axios'
import './App.css';

function App() {
  const [data, SetData] = useState({})
  const [location, setLocation] = useState('')
  const [temp, setTemp] = useState(0);
  const [isCelsius, setIsCelsius] = useState(true)


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&&units=imperial&appid=2c2d2304f9bfbee15bdb8e570fa2dc31`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        SetData(response.data)
        console.log(response.data)
        setTemp(response.data.main.temp - 273)
      })
      setLocation('')
    }
  }

  console.log(isCelsius)

  const convertCelcius = () => {
    if (isCelsius) {
      setTemp((temp * 9 / 5) + 32);
      setIsCelsius(false);
    } else {
      setCelsius((Celcius - 32) - 5 / 9);
      setIsCelsius(true);
    }
  }



  return (
    <div className="app">
      <div className="card">
        <div className="search">
          <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder='Enter Location'
            type="text" />
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              <div><b>Temp: </b> {temp} {isCelsius ? "fahrenheit" : "celcius"}</div>
            </div>
            <div className="description">
              
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
          {data.name != undefined &&
            <div className="button">
              <button onClick={convertCelcius}>convert to celcius</button>
              <div className="feels">
                {data.main ? <p className='bold'>{data.main.feels_like.toFixed}°F</p> : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? <p className='bold'>{data.wind.speed.toFixed} MPH</p> : null}
                <p>Wind Speed</p>
              </div>
            </div>
          }
        </div>
        </div>

    </div>
  )
}



export default App;
