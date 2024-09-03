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
  required = true,
}) => {
  const backgroundColorClass = `${backgroundColor}-bg`;
  const textColorClass = `${textColor}-txt`;
  if (hidden) {
    return null;
  }
  return (
    <div className="flex column input-lable">
      <div>
        <label className=" black-txt " style={{ width: width }}>
          {name}
          {required && <span className="required">*</span>}
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
