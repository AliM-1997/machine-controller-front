import React from "react";
import "./style.css";
import Header from "../../components/Header";
import Label from "../../base/Label";
import Input from "../../base/Input";
import Button from "../../base/Button";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MachineCard from "../../components/MachineCard";
const AllMachines = () => {
  const options = [
    { label: "All Machines", url: "allmachines" },
    { label: "Add Machine", url: "addmachine" },
  ];
  const machineData = {
    name: "Milling Machine",
    serial_number: "1101",
    location: "A44",
    unit_per_hour: 100,
    status: "active",
    last_maintenance: "00-00-0000",
    image_path: "",
  };
  return (
    <div className="flex column gap">
      <Header pageName="All Machines" options={options} />
      <div className="flex column gap machines-container">
        <div>
          <h2>
            <Label placeholder="All Machines" />
          </h2>
        </div>
        <div className=" flex row  full-width space-btw search-bar">
          <Input
            placeHolder="search machine"
            leftIcon={faSearch}
            width="20vw"
            required={false}
          />
          <Button
            width="8vw"
            placeHolder="add machine"
            backgroundColor="primary"
          />
        </div>
        <div>
          <MachineCard machineData={machineData} />
        </div>
      </div>
    </div>
  );
};

export default AllMachines;
