import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../components/Header";
import Label from "../../base/Label";
import DisplayImage from "../../base/DisplayImage";
import { useParams } from "react-router-dom";

const SelectedMachine = () => {
  const { id } = useParams();
  const options = [
    { label: "Selected Machine", url: "selectedmachine" },
    { label: "Add Machine", url: "addmachine" },
    { label: "All Machines", url: "allmachines" },
  ];

  return (
    <div>
      <Header pageName="Selected Machine" options={options} />
      <div>
        <div>
          <Label placeholder="Selected Machine" />
        </div>
        <div>
          <DisplayImage />
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default SelectedMachine;
