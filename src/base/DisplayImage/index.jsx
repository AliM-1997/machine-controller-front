import React from "react";
import "./style.css";
const DisplayImage = ({
  url,
  width = "50px",
  heigth = "50px",
  borderRadius = "50%",
}) => {
  const baseUrl = process.env.REACT_APP_BASE_URL_IMAGE;
  console.log("base url", baseUrl);
  const fullurl = `${baseUrl}/storage/${url}`;
  console.log("full url", fullurl);
  return <div>hello from image</div>;
};

export default DisplayImage;
