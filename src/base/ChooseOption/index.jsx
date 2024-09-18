import React, { useState } from "react";
import "./style.css";
import Icon from "../Icon";
import Label from "../Label";
import { useDarkMode } from "../../data/constext/DarkModeContext";

const ChooseOption = ({
  options = [],
  onSelect,
  placeholder = "Select an option",
  backgroundColor = "white",
  width,
  textColor = "black",
  leftIcon,
  rightIcon,
  iconColor,
  name,
  required = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState();
  const { darkMode } = useDarkMode();
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSearchTerm(option.label);
    if (onSelect) {
      onSelect(option);
    }
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const filteredOptions = options.filter((option) => option.label);
  const containerStyles = {
    width,
    backgroundColor: darkMode ? "#333" : "#fff", // Dark mode background and light mode background
    color: darkMode ? "#fff" : "#000", // Dark mode text color and light mode text color
  };
  const backgroundColorClass = `${backgroundColor}-bg`;
  const textColorClass = `${textColor}-txt`;

  return (
    <div className="flex column input-label ">
      <div className="flex column gap">
        <div className="flex column input-lable">
          <label
            className=""
            style={{ width, color: darkMode ? "white" : "black" }}
          >
            {name}
            {required && <span className="required">*</span>}
          </label>

          <div
            className={`input-container ${darkMode ? "black-bg" : "white-bg"}`}
            style={{ width, position: "relative" }}
          >
            <div></div>
            <Icon
              icon={leftIcon}
              color={iconColor ? iconColor : darkMode ? "white" : "black"}
            />
            <input
              className={`input-field`}
              style={{ color: darkMode ? "white" : "black" }}
              value={searchTerm}
              onChange={handleInputChange}
              placeholder={placeholder}
              type="text"
            />
            <Icon icon={rightIcon} color={iconColor} />
            {isOpen && (
              <div
                className={`toggle-option con`}
                style={{
                  width,
                  backgroundColor: darkMode ? "#171a1d" : "#f1f1f1",
                  color: darkMode ? "#fff" : "#000",
                }}
              >
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      className="selected-option"
                    >
                      {option.label}
                    </div>
                  ))
                ) : (
                  <div style={{ padding: "8px" }}>No options available</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseOption;
