import React from "react";
import "./style.css";
import Header from "../../components/Header";
const AddMachine = () => {
  const options = [
    {
      label: "Add Machine",
      url: "/addmachine",
    },
  ];
  return (
    <div>
      <Header pageName="Add/Edit Machine" options={options} />
    </div>
  );
};

export default AddMachine;
