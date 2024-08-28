import React from "react";
import "./style.css";
import DisplayImage from "../../base/DisplayImage";

const MachineCard = ({ machineData, width = "23vw", height = "36vh" }) => {
  return (
    <div className="machine-card flex row white-bg">
      <div>
        <DisplayImage
          url={machineData.image_path}
          width={width}
          height={height}
          borderRadius="24px 0 0 24px"
        />
      </div>
      <div className="flex column machine-info">
        <div>
          <h2>{machineData.name}</h2>
        </div>
        <div className="info-table">
          <div className="info-row">
            <div className="info-label">Name</div>
            <div className="info-value">{machineData.name}</div>
          </div>
          <div className="info-row">
            <div className="info-label">ID</div>
            <div className="info-value">{machineData.serial_number}</div>
          </div>
          <div className="info-row">
            <div className="info-label">Status</div>
            <div className="info-value">{machineData.status}</div>
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
            <div className="info-value">{machineData.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineCard;
