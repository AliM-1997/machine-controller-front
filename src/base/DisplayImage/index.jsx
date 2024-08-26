import React from "react";
import "./style.css";
const DisplayImage = ({
  url,
  width = "50px",
  heigth = "50px",
  borderRadius = "50%",
}) => {
  const baseUrl = process.env.REACT_APP_BASE_URL_IMAGE;
  const fullurl = `${baseUrl}/storage/${url}`;
  return (
    <div>
      <img
        src={fullurl}
        style={{ width: width, height: heigth, borderRadius: borderRadius }}
      />
    </div>
  );
};

export default DisplayImage;
