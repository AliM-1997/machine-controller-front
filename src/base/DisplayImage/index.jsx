import React from "react";
import "./style.css";
import white_bg from "../../assets/images/white-bg.png";
const DisplayImage = ({
  url,
  width = "",
  height = "",
  borderRadius = "50%",
}) => {
  const baseUrl = process.env.REACT_APP_BASE_URL_IMAGE;
  const fullUrl = url && baseUrl ? `${baseUrl}/storage/${url}` : white_bg;
  const handleError = (e) => {
    e.target.src = white_bg;
  };

  return (
    <div>
      <img
        src={fullUrl}
        onError={handleError}
        style={{ width: width, height: height, borderRadius: borderRadius }}
        alt="User"
      />
    </div>
  );
};

export default DisplayImage;
