import React from "react";
import "./style.css";
import DisplayImage from "../../base/DisplayImage";
import Icon from "../../base/Icon";
import {
  faAngleRight,
  faEdit,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import HighlightLabel from "../../base/HighlightLable";
import { useDarkMode } from "../../data/constext/DarkModeContext";

const MachineCard = ({
  label = null,
  machineData,
  width = "25vw",
  height = "10vw",
  onEdit,
  onDelete,
  onPreview,
  selected = false,
}) => {
  const { darkMode } = useDarkMode();
  React.useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);
  return (
    <div className="machine-card flex column white-bg ">
      <DisplayImage
        url={machineData.image_path}
        borderRadius="24px 24px 0 0"
        width={width}
        height={height}
        className="only-image"
      />
      <div
        className={`flex column machine-info ${
          darkMode ? "black-bg" : "white-bg"
        }`}
      >
        <div>
          <h1>{label}</h1>
        </div>
        <div className=" flex space-btw">
          <div className={`${darkMode ? "white-txt" : "black-txt"}`}>
            <h2>{machineData.name}</h2>
          </div>
          <div className="flex gap-btn ">
            <Icon
              icon={faEdit}
              color={!darkMode ? "black" : "white"}
              onClick={onEdit}
            />
            <Icon
              icon={faTrashCan}
              color={!darkMode ? "black" : "white"}
              onClick={onDelete}
            />
            <Icon
              icon={faAngleRight}
              onClick={onPreview}
              color={!darkMode ? "black" : "white"}
            />
          </div>
        </div>
        <div className="info-table">
          {/* <div className="info-row">
            <div className="info-label">Name</div>
            <div className="info-value">{machineData.name}</div>
          </div> */}
          <div className="info-row">
            <div className="info-label">Serial Number</div>
            <div className="info-value">{machineData.serial_number}</div>
          </div>
          <div className="info-row">
            <div className="info-label">Status</div>

            <HighlightLabel placeHolder={machineData.status} />
          </div>
          {selected && (
            <>
              <div className="info-row">
                <div className="info-label">Last Maintenance</div>
                <div className="info-value">{machineData.last_maintenance}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Max unit/hr</div>
                <div className="info-value">{machineData.unit_per_hour}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Location</div>
                <div className="info-value">{machineData.location}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Description</div>
                <div className="info-value scrollable-description">
                  {machineData.description}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MachineCard;
