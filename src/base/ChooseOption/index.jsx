import React, { useState } from "react";
import "./style.css";
import Icon from "../Icon";
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
    onSelect(option);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const backgroundColorClass = `${backgroundColor}-bg`;
  const textColorClass = `${textColor}-txt`;

  return (
    <div>
      <div>
        <label className="bold black-txt" style={{ width }}>
          {name}
          {required && <span className="required">*</span>}
        </label>
      </div>
      <div
        className={`input-container ${backgroundColorClass}`}
        style={{ width, position: "relative" }}
      >
        <Icon icon={leftIcon} color={iconColor} />
        <input
          className={`input-field ${textColorClass}`}
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
        <Icon icon={rightIcon} color={iconColor} onClick={toggleDropdown} />
      </div>
    </div>
  );
};

export default ChooseOption;
