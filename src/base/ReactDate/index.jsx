import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import Icon from "../Icon";
import { format, parse } from "date-fns";

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

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);

    if (onChange) {
      const formattedDate = selectedDate
        ? format(selectedDate, "yyyy-MM-dd")
        : null;
      onChange(formattedDate);
    }
  };

  return (
    <div className="flex column input-lable">
      {name && (
        <div>
          <label className={` ${textColorClass}`} style={{ width: width }}>
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
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText={placeHolder}
          minDate={mindata ? new Date() : null}
        />
        <Icon icon={rightIcon} />
      </div>
    </div>
  );
};

export default ReactDate;
