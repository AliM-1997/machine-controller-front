import React from "react";
import "./style.css";
import Header from "../../components/Header";
const AllMachines = () => {
  const options = [
    { label: "All Machines", url: "allmachines" },
    { label: "Add Machine", url: "addmachine" },
  ];
  return (
    <div>
      <Header pageName="All Machines" options={options} />
    </div>
  );
};

export default AllMachines;
