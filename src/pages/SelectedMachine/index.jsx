import React from "react";
import "./style.css";
import Header from "../../components/Header";

const SelectedMachine = () => {
  const options = [
    { label: "Selected Machine", url: "selectedmachine" },
    { label: "Add Machine", url: "addmachine" },
    { label: "All Machines", url: "allmachines" },
  ];
  return (
    <div>
      <Header pageName="Selected Machine" options={options} />
    </div>
  );
};

export default SelectedMachine;
