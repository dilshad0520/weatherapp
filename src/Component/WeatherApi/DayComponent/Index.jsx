import React from "react";

// import "./Insex.css";

const DayComponent = (props) => {
  return (
    <>
      <div className="weather-forcast-scroll">
        <div className="weather-forcast-day">
          <img src={props.img} alt="" />
          <div className="forcast-dayname">
            <h5>{props.head}</h5>
            <p>{props.para}</p>
          </div>
          <div className="forcast-temp">
            <h2>{props.heading}°C</h2>
            <p>{props.paragraph}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DayComponent;
