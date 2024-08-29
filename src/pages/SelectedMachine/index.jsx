import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../components/Header";
import Label from "../../base/Label";
import DisplayImage from "../../base/DisplayImage";
import { useParams } from "react-router-dom";
import { Machines } from "../../data/remote/Machine";

const SelectedMachine = () => {
  const { id } = useParams();

  const options = [
    { label: "Selected Machine", url: "selectedmachine" },
    { label: "Add Machine", url: "addmachine" },
    { label: "All Machines", url: "allmachines" },
  ];
  const handleMachineById = async () => {
    try {
      const data = await Machines.GetMachineById(id);
      console.log("asdfsadfdsdfds", data);
    } catch (error) {
      console.error("Error fetching machine data:", error);
    }
  };
  useEffect(() => {
    {
      handleMachineById();
    }
  }, []);
  return (
    <div>
      <Header pageName="Selected Machine" options={options} />
      <div className=" flex column selectedMachine-container">
        <div>
          <h2>
            <Label placeholder="Selected Machine" />
          </h2>
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
