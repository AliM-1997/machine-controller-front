import React from "react";
import "./style.css";

const Label = ({
  placeholder,
  textColor = "black",
  width,
  backgroundColor = "secondary",
  fontWeight,
}) => {
  const backgroundColorClass = `${backgroundColor}-bg`;
  const textColorClass = `${textColor}-txt`;
  return (
    <div>
      <label
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
