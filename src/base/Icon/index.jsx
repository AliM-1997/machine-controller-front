import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = ({ icon, color = "", onClick }) => {
  return (
    <div>
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          style={{ color: color }}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default Icon;
