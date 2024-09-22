import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = ({ icon, color = "white", onClick }) => {
  const colorclass = `${color}-color`;
  return (
    <div>
      {icon && (
        <FontAwesomeIcon icon={icon} className={colorclass} onClick={onClick} />
      )}
    </div>
  );
};

export default Icon;
