import React from "react";
import "./style.css";
import ReactDate from "../../base/ReactDate";
import { faCalendarAlt, faX } from "@fortawesome/free-solid-svg-icons";
import Button from "../../base/Button";
import Label from "../../base/Label";
import Icon from "../../base/Icon";
const DashboardFilter = () => {
  return (
    <div className="flex column white-bg gap filter-cont">
      <div className="flex end">
        <Icon icon={faX} />
      </div>
      <div className=" gap">
        <div className=" flex column center gap">
          <h3>
            <Label placeholder="Date" width="20vw" clas />
          </h3>
          <div className="date_1">
            <ReactDate
              leftIcon={faCalendarAlt}
              mindata={false}
              name="date"
              required={false}
              width="25vw"
            />
          </div>
          <div className="btn-date">
            <Button
              width="8vw"
              backgroundColor="primary"
              placeHolder="submit"
              textColor="white"
            />
          </div>
        </div>
      </div>
      <div className="flex column gap">
        <div className=" flex column center gap">
          <h3>
            <Label
              placeholder="Between Date"
              width="20vw"
              backgroundColor="none"
            />
          </h3>
          <div className="flex gap">
            <ReactDate
              leftIcon={faCalendarAlt}
              mindata={false}
              name="date_1"
              required={false}
              width="12vw"
            />
            <ReactDate
              leftIcon={faCalendarAlt}
              mindata={false}
              name="date_2"
              width="12vw"
              required={false}
            />
          </div>
          <div className="btn-date">
            <Button
              width="8vw"
              backgroundColor="primary"
              placeHolder="submit"
              textColor="white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardFilter;
