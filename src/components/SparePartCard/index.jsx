import React from "react";
import "./style.css";
import DisplayImage from "../../base/DisplayImage";
import Label from "../../base/Label";
const SparePartCard = ({ sparePart }) => {
  return (
    <div className="flex column white-bg sparepart-card">
      <DisplayImage
        url={sparePart.mage_path}
        width="150px"
        height="150px"
        borderRadius="12px  12px 0 0"
      />
      <div className=" flex column center">
        <Label placeholder={sparePart.name} backgroundColor="white" />
        <Label placeholder={sparePart.serial_number} backgroundColor="white" />
      </div>
    </div>
  );
};

export default SparePartCard;
