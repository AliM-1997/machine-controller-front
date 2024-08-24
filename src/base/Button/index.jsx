import React from "react";
import "./style.css";
import Icon from "../Icon";
const Button = ({
  placeHolder = "",
  leftIcon = null,
  rightIcon = null,
  backgroundColor = "secondary",
  textColor = "black",
  type = "button",
  width = "",
  onClick,
}) => {
  const backgroundColorClass = `${backgroundColor}-bg`;
  const textColorClass = `${textColor}-txt`;
  return (
    <div>
      <button
        type={type}
        style={{ width: width }}
        onClick={onClick}
        className={`btn ${backgroundColorClass} ${textColorClass}`}
      >
        <Icon icon={leftIcon} />
        {placeHolder}
        <Icon icon={rightIcon} />
      </button>
    </div>
  );
};

export default Button;
