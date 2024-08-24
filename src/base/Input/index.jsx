import React from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = ({
  placeHolder = "search ...",
  leftIcon = null,
  rightIcon = null,
  backgroundColor = "white",
  textColor = "black",
  type = "text",
  value = "",
  width = "",
  onChange,
  onClick,
}) => {
  const backgroundColorClass = `${backgroundColor}-bg`;
  const textColorClass = `${textColor}-txt`;
  return (
    <div
      className={`input-container ${backgroundColorClass}`}
      style={{ width: width }}
      onClick={onClick}
    >
      {leftIcon && <FontAwesomeIcon icon={leftIcon} />}
      <input
        type={type}
        className={` input-field ${textColorClass}`}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
      />
      {rightIcon && <FontAwesomeIcon icon={rightIcon} />}
    </div>
  );
};

export default Input;
