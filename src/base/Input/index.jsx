import React, { useEffect } from "react";
import "./style.css";
import Icon from "../Icon";
import { useDarkMode } from "../../data/constext/DarkModeContext";

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
  required = true,
  iconColor = "black",
}) => {
  const { darkMode } = useDarkMode();
  const backgroundColorClass = darkMode ? "black-bg" : "white-bg";
  const textColorClass = darkMode ? "white-txt" : "black-txt";
  const iconColorClass = darkMode ? "white" : "black";

  if (hidden) {
    return null;
  }
  return (
    <div className="flex column input-lable ">
      <div>
        <label className={textColorClass} style={{ width: width }}>
          {name}
          {required && <span className="required">*</span>}
        </label>
      </div>
      <div
        className={`input-container ${backgroundColorClass}`}
        style={{ width: width }}
        onClick={onClick}
      >
        <Icon icon={leftIcon} color={iconColorClass} />
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
