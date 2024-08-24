import React from "react";
import "./style.css";
const Input = ({
  placeHolder = "search ...",
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
      <input
        type={type}
        className={` input-field ${textColorClass}`}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
