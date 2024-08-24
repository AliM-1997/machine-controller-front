import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = ({ icon }) => {
  return <div>{icon && <FontAwesomeIcon icon={icon} />}</div>;
};

export default Icon;
