import React from "react";
import "./style.css";
import Header from "../../components/Header";
import Label from "../../base/Label";
const AllMachines = () => {
  const options = [
    { label: "All Machines", url: "allmachines" },
    { label: "Add Machine", url: "addmachine" },
  ];
  return (
    <div className="flex column gap">
      <Header pageName="All Machines" options={options} />
      <div className="flex column gap machines-container">
        <div>
          <h2>
            <Label placeholder="All Machines" />
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AllMachines;
