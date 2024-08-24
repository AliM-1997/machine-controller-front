import React from "react";
import "./style.css";
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
  return <div></div>;
};

export default Button;
