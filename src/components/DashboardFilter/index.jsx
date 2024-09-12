import React from "react";
import "./style.css";
import ReactDate from "../../base/ReactDate";
import { faCalendarAlt, faX } from "@fortawesome/free-solid-svg-icons";
import Button from "../../base/Button";
import Label from "../../base/Label";
import Icon from "../../base/Icon";
import { useDarkMode } from "../../data/constext/DarkModeContext";
const DashboardFilter = ({
  onExit,
  dateChange,
  date_1_Change,
  date_2_change,
  filter1,
  filter2,
}) => {
  const { darkMode } = useDarkMode();
  return (
    <div
      className="flex column  gap filter-cont "
      style={{ backgroundColor: darkMode ? "#171a1d" : "#f1f1f1" }}
    >
      <div className="flex end">
        <Icon
          icon={faX}
          onClick={onExit}
          color={darkMode ? "white" : "black"}
        />
      </div>
      <div className=" gap">
        <div className=" flex column start gap">
          <h3>
            <Label
              placeholder="Date"
              className={` flex start `}
              backgroundColor={darkMode ? "teriary-bg" : "secondary-bg"}
              textColor={darkMode ? "white" : "black"}
            />
          </h3>
          <div className="date_1">
            <ReactDate
              leftIcon={faCalendarAlt}
              mindata={false}
              name="On"
              required={false}
              width="25vw"
              onChange={dateChange}
            />
          </div>
          <div className="btn-date">
            <Button
              width="8vw"
              backgroundColor="primary"
              placeHolder="submit"
              textColor="white"
              onClick={filter1}
            />
          </div>
        </div>
      </div>
      <div className="flex column gap">
        <div className=" flex column center gap">
          <div className="flex gap">
            <ReactDate
              leftIcon={faCalendarAlt}
              mindata={false}
              name="From"
              required={false}
              width="12vw"
              onChange={date_1_Change}
            />
            <ReactDate
              leftIcon={faCalendarAlt}
              mindata={false}
              name="To"
              width="12vw"
              required={false}
              onChange={date_2_change}
            />
          </div>
          <div className="btn-date">
            <Button
              width="8vw"
              backgroundColor="primary"
              placeHolder="submit"
              textColor="white"
              onClick={filter2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardFilter;
