import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = ({ icon, color = "" }) => {
  return (
    <div>
      {icon && <FontAwesomeIcon icon={icon} style={{ color: color }} />}
    </div>
  );
};

export default Icon;
