import React, { useState } from "react";
import "./style.css";
import Icon from "../Icon";
import Label from "../Label";

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
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredOptions = options.filter(
    (option) =>
      option.label &&
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const backgroundColorClass = `${backgroundColor}-bg`;
  const textColorClass = `${textColor}-txt`;

  return (
    <div className="flex column input-label ">
      <div className="flex column gap">
        <div className="flex column input-lable">
          <label className="black-txt" style={{ width }}>
            {name}
            {required && <span className="required">*</span>}
          </label>

          <div
            className={`input-container ${backgroundColorClass}`}
            style={{ width, position: "relative" }}
          >
            <div></div>
            <Icon icon={leftIcon} color={iconColor} />
            <input
              className={`input-field ${textColorClass}`}
              value={searchTerm}
              onChange={handleInputChange}
              placeholder={placeholder}
              type="text"
            />
            <Icon icon={rightIcon} color={iconColor} />
            {isOpen && (
              <div className="toggle-option" style={{ width }}>
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
