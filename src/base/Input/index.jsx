import React from "react";
import "./style.css";
const Input = ({
  placeHolder = "search ...",
  icon = null,
  backgroundColor = "white",
  textColor = "black",
  type = "text",
  value = "",
  width = "",
  onChange,
  onClick,
}) => {
  const backgroundColorclass = `${backgroundColor}-bg`;
  const textColorClass = `${textColor}-txt`;
  return (
    <div>
      <input />
    </div>
  );
};

export default Input;
