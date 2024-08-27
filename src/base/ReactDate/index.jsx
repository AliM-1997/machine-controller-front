import React from "react";
("./style.css");
const ReactDate = ({
  placeHolder = "Select a date",
  leftIcon = null,
  rightIcon = null,
  backgroundColor = "white",
  textColor = "black",
  width = "",
  onChange,
  name = "",
  border = true,
}) => {
  const backgroundColorClass = `${backgroundColor}-bg`;
  const textColorClass = `${textColor}-txt`;
  const borderClass = border ? "border" : "";
  return (
    <div>
      {name && (
        <div>
          <label className={`bold ${textColorClass}`} style={{ width: width }}>
            {name}
          </label>
        </div>
      )}
      <div
        className={`input-container ${backgroundColorClass} ${borderClass}`}
        style={{ width: width }}
      >
        <DatePicker
          className={`input-field ${textColorClass}`}
          selected={date}
          onChange={(date) => {
            setDate(date);
            if (onChange) onChange(date);
          }}
          dateFormat="dd/MM/yyyy"
          placeholderText={placeHolder}
          minDate={new Date()}
        />
      </div>
    </div>
  );
};

export default ReactDate;
