import React, { useState, useEffect } from "react";
import "./style.css";
import { useDarkMode } from "../../data/constext/DarkModeContext";

const Slider = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [isOn, setIsOn] = useState(darkMode);

  useEffect(() => {
    setIsOn(darkMode);
  }, [darkMode]);

  const handleToggle = () => {
    toggleDarkMode();
    setIsOn(!isOn);
  };

  return (
    <div
      className={`slider-mode-container ${isOn ? "slider-on" : "slider-off"}`}
      onClick={handleToggle}
    >
      <div className={`switch-mode ${isOn ? "switch-on" : "switch-off"}`}></div>
    </div>
  );
};

export default Slider;
