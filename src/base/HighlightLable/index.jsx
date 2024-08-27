import React from "react";
import "./style.css";

const HighlightLabel = ({ highlight = true, placeHolder = "text" }) => {
  let textColor = "";
  let backgroundColor = "";

  return (
    <div className={`highlight-label ${textColor}-txt ${backgroundColor}-bg`}>
      {placeHolder}
    </div>
  );
};

export default HighlightLabel;
