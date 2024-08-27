import React, { useState } from "react";
import "./style.css";
const DropButton = ({
  options,
  onSelect,
  placeHolder,
  backgroundColor,
  width,
  textColor,
  leftIcon,
  rightIcon,
  iconColor,
}) => {
  const [isopen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isopen);
  };
  const optionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };
  return <div></div>;
};

export default DropButton;
