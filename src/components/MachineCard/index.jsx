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

const MachineCard = ({
  label = null,
  machineData,
  width = "30vw",
  onEdit,
  onDelete,
  onPreview,
  height,
}) => {
  return (
    <div
      className="machine-card flex column white-bg "
      style={{ width: width }}
    >
      <DisplayImage
        url={machineData.image_path}
        borderRadius="24px 24px 0 0"
        width={width}
        height={height}
      />
      <div className="flex column machine-info ">
        <div>
          <h1>{label}</h1>
        </div>
        <div className=" flex space-btw">
          <div>
            <h2>{machineData.name}</h2>
          </div>
          <div className="flex gap-btn ">
            <Icon icon={faEdit} color={"black"} onClick={onEdit} />
            <Icon icon={faTrashCan} color={"black"} onClick={onDelete} />
            <Icon icon={faAngleRight} onClick={onPreview} />
          </div>
        </div>
        <div className="info-table">
          <div className="info-row">
            <div className="info-label">Name</div>
            <div className="info-value">{machineData.name}</div>
          </div>
          <div className="info-row">
            <div className="info-label">Serial Number</div>
            <div className="info-value">{machineData.serial_number}</div>
          </div>
          <div className="info-row">
            <div className="info-label">Status</div>

            <HighlightLabel placeHolder={machineData.status} />
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default MachineCard;
