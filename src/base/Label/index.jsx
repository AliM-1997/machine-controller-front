import React from "react";
import "./style.css";

const Label = ({
  placeholder,
  textColor = "black",
  width,
  backgroundColor = "secondary",
  fontWeight,
  onclick,
}) => {
  const backgroundColorClass = `${backgroundColor}-bg`;
  const textColorClass = `${textColor}-txt`;
  return (
    <div>
      <label
        onclick={onclick}
        className={`${backgroundColorClass} ${textColorClass} ${
          fontWeight === "bold" ? "bold" : ""
        }`}
        style={{ width: width }}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default Label;
