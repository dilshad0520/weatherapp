import React, { useEffect, useState } from "react";
import "./Weatherapp.css";
import axios from "axios";
import moment from "moment";
import DayComponent from "./DayComponent/Index";
import ForecastComponent from "./ForcastComponent/Forcast";
import HightlightComponent from "./HighlightComponent/Highlight";

const Weather = () => {
  const [hours, setHours] = useState([]);
  const [daily, setDaily] = useState([]);
  const [city, setCityData] = useState("");
  const [currentData, setCurrrentData] = useState();
  ///////////////////////////////////////////////////////////////////////////////
  const inputHandler = (e) => {
    setCityData(e.target.value);
  };
  // console.log(currentData);
  ////////////////////////////////////////////////
  const api_key = "2f9adeffcf0df077e7b043a6e6a45fae";
  const searchCity = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
      )
      .then((res) => {
        const temp = Math.floor(res.data.main.temp / 10);
        const name = res.data.name;
        const countryCode = res.data.sys.country;
        const feels = Math.floor(res.data.main.feels_like - 273.15);
        const humidity = res.data.main.humidity;
        const pressure = Math.floor(res.data.main.pressure / 1000);
        const visibility = res.data.visibility / 1000;
        const windspeed = res.data.wind.speed;
        const clouds = res.data.clouds.all;
        setCurrrentData({
          clouds,
          temp,
          name,
          countryCode,
          feels,
          humidity,
          pressure,
          visibility,
          windspeed,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setCityData("");
  };

  //////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      axios
        .get(
          ` https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${api_key}`
        )
        .then((res) => {
          // console.log(res.data);
          const temp = Math.floor(res.data.main.temp / 10);
          const name = res.data.name;
          const countryCode = res.data.sys.country;
          const feels = Math.floor(res.data.main.feels_like - 273.15);
          const humidity = res.data.main.humidity;
          const pressure = Math.floor(res.data.main.pressure / 1000);
          const visibility = res.data.visibility / 1000;
          const windspeed = res.data.wind.speed;
          const clouds = res.data.clouds.all;
          setCurrrentData({
            clouds,
            temp,
            name,
            countryCode,
            feels,
            humidity,
            pressure,
            visibility,
            windspeed,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);
  // console.log(currentData);

  /////////////////////////////// new api data section  here .   ///////////////////
  async function getData(lat, lon) {
    const API_KEY = "3050828d775a7c1de9a5bc06bf111c01";
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&exclude=minutely&units=metric`
      )
      .then((res) => {
        setHours(res.data.hourly);
        setDaily(res.data.daily);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getData(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  return (
    <>
      <div className="wearher">
        <div className="container">
          <div className="weather-wrap">
            <div className="weather-area">
              <div className="weather-search">
                <input
                  type="text"
                  placeholder="search city"
                  onChange={(e) => inputHandler(e)}
                />
                <button className="weather-icon" onClick={searchCity}>
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
              <div className="current-time">
                <div className="weather-flex">
                  <div className="weather-content">
                    <span>
                      <i class="fa-solid fa-location-pin"></i>
                      {currentData?.name}
                    </span>
                    <h2>{currentData?.temp}°C </h2>
                    <h3> {moment().format("h:mm a")}</h3>
                    <p>{moment().format("Do,MMMM,yyy")}</p>
                    <p>{moment().format("dddd")}</p>
                  </div>
                  <div className="weather-image">
                    <img
                      src="https://api.openweathermap.org/img/w/03d.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div className="weather-forcast">
                <h2>The Next Day Forecast</h2>
              </div>
              <div className="forcast-data">
                <div className="weather-forcast-main">
                  {daily?.map((item) => {
                    const formateData = new Date(item.dt * 1000);
                    const date = formateData.toLocaleDateString("en-us", {
                      day: "2-digit",
                    });
                    const month = formateData.toLocaleDateString("en-us", {
                      month: "short",
                    });
                    const weekday = formateData.toLocaleDateString("en-us", {
                      weekday: "short",
                    });
                    // console.log(wekday);

                    return (
                      <>
                        <DayComponent
                          img="https://api.openweathermap.org/img/w/02d.png"
                          head={date}
                          para={month}
                          heading={Math.floor(item?.temp?.day)}
                          paragraph={weekday}
                        />
                      </>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="forcast-area">
              <div className="forcast-head">
                <h2>Today forecast - HAZE</h2>
              </div>
              <div className="forcast-scroll">
                <div className="forcast-wrap">
                  {hours?.map((item, index) => {
                    const convertedTime = new Date(item?.dt * 1000);
                    const time = convertedTime.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    });
                    return (
                      <>
                        <ForecastComponent
                          humidity={item.humidity}
                          img="https://api.openweathermap.org/img/w/04d.png"
                          head={time}
                          key={index}
                        />
                      </>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="highlight">
              <div className="highheads">
                <h2>Today highlights</h2>
              </div>
              <div className="hightlight-wrap">
                <HightlightComponent
                  head="feels like"
                  icon={<i class="fa-solid fa-temperature-high"></i>}
                  heading={`${currentData?.feels} °C`}
                />
                <HightlightComponent
                  head="Clouds"
                  icon={<i class="fa-solid fa-cloud"></i>}
                  heading={currentData?.clouds}
                />
                <HightlightComponent
                  head="Humidity"
                  icon={<i class="fa-solid fa-droplet"></i>}
                  heading={`${currentData?.humidity} %`}
                />
                <HightlightComponent
                  head="Pressure"
                  icon={<i class="fa-solid fa-meteor"></i>}
                  heading={`${currentData?.pressure} hPa`}
                />
                <HightlightComponent
                  head="Visibility"
                  icon={<i class="fa-regular fa-eye"></i>}
                  heading={`${currentData?.visibility} km`}
                />
                <HightlightComponent
                  head="wind"
                  icon={<i class="fa-solid fa-wind"></i>}
                  heading={`${currentData?.windspeed} km`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
