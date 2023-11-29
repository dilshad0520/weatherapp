import React from "react";

const HightlightComponent = (props) => {
  return (
    <>
      <div className="clouds-main">
        <div className="highlighttag">
          <h3>{props.head}</h3>
          <h2>
            {" "}
            <span>{props.icon}</span>
            {props.heading}
          </h2>
        </div>
      </div>
    </>
  );
};

export default HightlightComponent;
