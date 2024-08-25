import React from "react";
import "./style.css";
const Lable = ({
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
        className={`${backgroundColorClass} ${textColorClass}`}
        style={{ width: width, fontWeight: fontWeight }}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default Lable;
