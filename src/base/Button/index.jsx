import React from "react";
import "./style.css";
import Icon from "../Icon";
import Slider from "../Slider";
const Button = ({
  placeHolder = "",
  leftIcon = null,
  rightIcon = null,
  backgroundColor = "secondary",
  textColor = "black",
  type = "button",
  width = "",
  onClick,
  iconColor = "black",
  border = false,
  start = false,
  mode,
}) => {
  const backgroundColorClass = `${backgroundColor}-bg`;
  const textColorClass = `${textColor}-txt`;
  const borderClass = border ? "border" : "";

  return (
    <div>
      {start && (
        <div className="btn-1">
          <Icon icon={leftIcon} color={iconColor} />
          <button
            type={type}
            style={{ width: width }}
            onClick={onClick}
            className={`btn ${backgroundColorClass} ${textColorClass} ${borderClass}`}
          >
            {placeHolder}
            <Icon icon={rightIcon} />
          </button>
        </div>
      )}
      <button
        type={type}
        style={{ width: width }}
        onClick={onClick}
        className={`btn ${backgroundColorClass} ${textColorClass} ${borderClass}`}
      >
        {leftIcon ? (
          <>
            <div className="flex gap-btn">
              <Icon icon={leftIcon} color={iconColor} />
              {placeHolder}
            </div>
            <>{mode ? <Slider /> : <Icon icon={rightIcon} />}</>
          </>
        ) : (
          <>
            <Icon icon={leftIcon} color={iconColor} />
            {placeHolder}
            <Icon icon={rightIcon} />
          </>
        )}
      </button>
    </div>
  );
};

export default Button;
