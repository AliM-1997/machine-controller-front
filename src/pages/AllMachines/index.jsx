import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../components/Header";
import Label from "../../base/Label";
import Input from "../../base/Input";
import Button from "../../base/Button";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MachineCard from "../../components/MachineCard";
import { Machines } from "../../data/remote/Machine";
const AllMachines = () => {
  const [allMachines, setAllMachines] = useState([]);
  const [searchMachine, setSearchMachine] = useState("");
  const handleAllMachines = async () => {
    const data = await Machines.GetAllMachines();
    setAllMachines(data.machineInputs);
  };

  const handleMachineByID = async () => {
    console.log("search_id", searchMachine);
    if (searchMachine) {
      try {
        const data = await Machines.GetMachineById(searchMachine);
        setAllMachines([data.machine_input]);
      } catch (error) {
        setAllMachines([]);
      }
    } else {
      handleAllMachines();
    }
  };

  useEffect(() => {
    handleAllMachines();
  }, []);

  useEffect(() => {
    handleMachineByID();
  }, [searchMachine]);

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
        <div className=" flex row  full-width space-btw search-bar">
          <Input
            placeHolder="search machine"
            leftIcon={faSearch}
            width="20vw"
            required={false}
            onChange={(e) => setSearchMachine(e.target.value)}
          />
          <Button
            width="8vw"
            placeHolder="add machine"
            backgroundColor="primary"
          />
        </div>
        <div className="flex column gap scrollable-machine-table">
          {allMachines.length > 0 ? (
            allMachines.map((machine) => (
              <MachineCard key={machine.id} machineData={machine} />
            ))
          ) : (
            <td colSpan="7">No tasks found</td>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllMachines;
