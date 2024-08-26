import React from "react";
import "./style.css";
import Icon from "../Icon";

const Input = ({
  placeHolder = "search ...",
  leftIcon = null,
  rightIcon = null,
  backgroundColor = "white",
  textColor = "black",
  type = "text",
  width = "",
  onChange,
  onClick,
  name = "",
  hidden = false,
  error,
}) => {
  const backgroundColorClass = `${backgroundColor}-bg`;
  const textColorClass = `${textColor}-txt`;
  if (hidden) {
    return null;
  }
  return (
    <div>
      <div>
        <label className="bold black-txt " style={{ width: width }}>
          {name}
        </label>
      </div>
      <div
        className={`input-container ${backgroundColorClass}`}
        style={{ width: width }}
        onClick={onClick}
      >
        <Icon icon={leftIcon} />
        <input
          type={type}
          className={` input-field ${textColorClass}`}
          placeholder={placeHolder}
          // value={value}
          onChange={onChange}
        />
        <Icon icon={rightIcon} />
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input;
