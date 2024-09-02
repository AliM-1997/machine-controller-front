import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../components/Header";
import Label from "../../base/Label";
import DisplayImage from "../../base/DisplayImage";
import { useParams } from "react-router-dom";
import { Machines } from "../../data/remote/Machine";
import MachineCard from "../../components/MachineCard";

const SelectedMachine = () => {
  const { id } = useParams();
  const [selectedMachine, setSelectedMachine] = useState([]);
  const options = [
    { label: "Selected Machine", url: "selectedmachine/:id" },
    { label: "Add Machine", url: "addmachine" },
    { label: "All Machines", url: "allmachines" },
  ];
  const handleMachineById = async () => {
    const data = await Machines.GetMachineById(id);
    setSelectedMachine(data.machine_input);
    console.log(data);
  };
  useEffect(() => {
    {
      handleMachineById();
    }
  }, []);
  return (
    <div className="flex column gap">
      <Header pageName="Selected Machine" options={options} />
      <div className=" flex column selectedMachine-container gap">
        <div>
          <h2>
            <Label placeholder="Selected Machine" />
          </h2>
        </div>
        <div>
          <DisplayImage
            url={selectedMachine.image_path}
            width="78.5vw"
            height="80vh"
            borderRadius="12px"
          />
        </div>
        <div>
          <div>
            <div>
              <MachineCard
                label={"Machine Info"}
                machineData={selectedMachine}
                width="78.5"
                height="10px"
                className="selected-machine-info"
                selected={true}
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default SelectedMachine;
