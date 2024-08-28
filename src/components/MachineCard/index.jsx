import React from "react";
import "./style.css";
import DisplayImage from "../../base/DisplayImage";
const MachineCard = ({ machineData }) => {
  return (
    <div className="machine-card flex row white-bg" width="70vw" height="20vh">
      <div>
        <DisplayImage
          url={machineData.image_path}
          width="23vw"
          height="25vh"
          borderRadius="24px 0 0 24px"
        />
      </div>
      <div></div>
    </div>
  );
};

export default MachineCard;
