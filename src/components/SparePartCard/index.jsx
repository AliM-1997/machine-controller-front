import React, { useEffect } from "react";
import "./style.css";
import DisplayImage from "../../base/DisplayImage";
import Label from "../../base/Label";
import { useDarkMode } from "../../data/constext/DarkModeContext";
import Icon from "../../base/Icon";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Gear from "../../assets/images/gear.jpg";
const SparePartCard = ({ sparePart, onEdit }) => {
  const { darkMode } = useDarkMode();
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);
  return (
    <div className="flex column white-bg sparepart-card">
      {sparePart.image_path ? (
        <DisplayImage
          url={sparePart.image_path}
          width="150px"
          height="150px"
          borderRadius="12px  12px 0 0"
        />
      ) : (
        <img
          src={Gear}
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "12px 12px 0 0",
          }}
        />
      )}
      <div
        className={`flex column sparepart-info ${
          darkMode ? "tertiary-bg" : "white-bg"
        }`}
      >
        <div className=" flex   space-btw   ">
          <Label
            placeholder={sparePart.name}
            backgroundColor="mode"
            textColor="mode"
          />
          <Icon
            icon={faEdit}
            color={darkMode ? "white" : "black"}
            onClick={onEdit}
          />
        </div>
        <Label
          placeholder={sparePart.serial_number}
          backgroundColor="mode"
          textColor="mode"
        />
      </div>
    </div>
  );
};

export default SparePartCard;
