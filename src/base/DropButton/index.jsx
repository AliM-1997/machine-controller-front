import React, { useState } from "react";
import "./style.css";
import Icon from "../Icon";
import { useDarkMode } from "../../data/constext/DarkModeContext";
const DropButton = ({
  options,
  onSelect,
  placeHolder,
  backgroundColor,
  width,
  textColor,
  leftIcon,
  rightIcon,
  border,
  iconColor,
}) => {
  const [isopen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const placeholder =
    options.length > 0 ? options[0].label : "Select an option";

  const toggleDropdown = () => {
    setIsOpen(!isopen);
  };
  const optionClick = (option) => {
    setSelectedOption(option.label);
    onSelect(option);
    setIsOpen(false);
  };

  const backgroundColorClass = `${backgroundColor}-bg`;
  const textColorClass = `${textColor}-txt`;
  const borderClass = border ? "border:1px solid #c7c7c7" : "none";
  const { darkMode } = useDarkMode();
  return (
    <div style={{ position: "relative", width }}>
      <button
        style={{
          width,
          border: border ? `1px solid #c7c7c7` : "none",
        }}
        className={`dropbtn ${
          darkMode ? "black-bg" : "white-bg"
        } ${textColorClass} `}
        onClick={toggleDropdown}
      >
        <Icon
          icon={leftIcon}
          color={iconColor ? iconColor : darkMode ? "white" : "black"}
        />
        {placeholder}
        <Icon
          icon={rightIcon}
          color={iconColor ? iconColor : darkMode ? "white" : "black"}
        />
      </button>
      {isopen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width,
            zIndex: 1000,
          }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => optionClick(option)}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #ddd",
                borderRadius: "12px",
                width,
                backgroundColor: darkMode ? "#171a1d" : "#f1f1f1",
                color: darkMode ? "#fff" : "#000",
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropButton;
