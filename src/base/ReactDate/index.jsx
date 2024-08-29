import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import Icon from "../Icon";

const ReactDate = ({
  placeHolder = "dd/MM/yyyy",
  leftIcon = null,
  rightIcon = null,
  backgroundColor = "white",
  textColor = "black",
  width = "",
  onChange,
  name = "",
  border = true,
  required = true,
  mindata = true,
}) => {
  const [date, setDate] = useState(null);

  const backgroundColorClass = `${backgroundColor}-bg`;
  const textColorClass = `${textColor}-txt`;
  const borderClass = border ? "border" : "";

  return (
    <div>
      {name && (
        <div>
          <label className={`bold ${textColorClass}`} style={{ width: width }}>
            {name}
            {required && <span className="required">*</span>}
          </label>
        </div>
      )}
      <div
        className={`input-container ${backgroundColorClass} ${borderClass}`}
        style={{ width: width }}
      >
        <Icon icon={leftIcon} />
        <DatePicker
          className={`input-field ${textColorClass}`}
          selected={date}
          onChange={(date) => {
            setDate(date);
            if (onChange) onChange(date);
          }}
          dateFormat="dd/MM/yyyy"
          placeholderText={placeHolder}
          minDate={mindata ? new Date() : null}
        />
        <Icon icon={rightIcon} />
      </div>
    </div>
  );
};

export default ReactDate;
