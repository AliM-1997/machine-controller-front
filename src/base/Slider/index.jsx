import React, { useState } from "react";
import "./style.css";

const Slider = ({ modeChange }) => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
    modeChange();
  };

  return (
    <div
      className={`slider-container ${isOn ? "slider-on" : "slider-off"}`}
      onClick={handleToggle}
    >
      <div className={`switch ${isOn ? "switch-on" : "switch-off"}`}></div>
    </div>
  );
};

export default Slider;
