import React from "react";
import "./style.css";

const HighlightLabel = ({ highlight = true, placeHolder = "text" }) => {
  let textColor = "";
  let backgroundColor = "";

  switch (placeHolder) {
    case "Pending" || " Requiring Attention":
      textColor = "yellow";
      backgroundColor = "Lyellow";
      break;
    case "In Progress":
      textColor = "blue";
      backgroundColor = "Lblue";
      break;
    case "Completed" || "Active":
      textColor = "green";
      backgroundColor = "Lgreen";
      break;
    case "Risked" || "Under Maintenace":
      textColor = "red";
      backgroundColor = "Lred";
      break;
    case "Delayed":
      textColor = "orange";
      backgroundColor = "Lorange";
      break;
    default:
      textColor = "black";
      backgroundColor = "white";
  }

  return (
    <div className={`highlight-label ${textColor}-txt ${backgroundColor}-bg`}>
      {placeHolder}
    </div>
  );
};

export default HighlightLabel;
