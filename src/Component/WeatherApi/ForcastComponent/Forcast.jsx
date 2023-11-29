import React from "react";

// import "./Index.css";

const ForecastComponent = ({ key, humidity, img, head }) => {
  return (
    <>
      <div className="forcast-haze" key={key}>
        <p>{humidity}°C</p>
        <div className="clouds">
          <img src={img} alt="" />
        </div>
        <h3>{head}</h3>
      </div>
    </>
  );
};

export default ForecastComponent;
