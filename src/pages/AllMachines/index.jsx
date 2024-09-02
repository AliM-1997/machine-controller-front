import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../components/Header";
import Label from "../../base/Label";
import Input from "../../base/Input";
import Button from "../../base/Button";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MachineCard from "../../components/MachineCard";
import { Machines } from "../../data/remote/Machine";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoadMachine, UpdateMachine } from "../../data/redux/machineSlice";
import SelectedMachine from "../SelectedMachine";
import ChooseOption from "../../base/ChooseOption";
const AllMachines = () => {
  const response = useSelector((global) => global);
  const dispatch = useDispatch();
  const [allMachines, setAllMachines] = useState([]);
  const [searchMachine, setSearchMachine] = useState("");
  const navigate = useNavigate();
  const handleAllMachines = async () => {
    const data = await Machines.GetAllMachines();
    setAllMachines(data.machineInputs);
  };

  const handleMachineByname = async () => {
    if (searchMachine) {
      try {
        const data = await Machines.GetMachineByName(searchMachine);
        setAllMachines([data.machine]);
      } catch (error) {
        setAllMachines([]);
      }
    } else {
      handleAllMachines();
    }
  };
  const navigateToAddMachine = () => {
    navigate("/addmachine");
  };
  const previewMachine = (id) => {
    const selecedmachine = allMachines.find((machine) => machine.id === id);
    dispatch(LoadMachine(selecedmachine));
    navigate(`/selectedmachine/${id}`);
  };

  const editMachine = (id) => {
    const machine = allMachines.find((machine) => machine.id === id);
    dispatch(UpdateMachine(machine));
    navigate("/addmachine");
  };
  const deleteMachine = async (id) => {
    const deleteData = await Machines.DeleteMachine(id);
    if (deleteData) {
      alert("Machine Deleted Successfully");
      handleAllMachines();
    } else {
      alert("Failed to delete machine. Please try again.");
    }
  };

  const handleOptionChange = (option) => {
    setSearchMachine(option.label);
  };

  useEffect(() => {
    handleMachineByname();
  }, [searchMachine]);

  const options = [
    { label: "All Machines", url: "allmachines" },
    { label: "Add Machine", url: "addmachine" },
  ];

  return (
    <div className="flex column gap">
      <Header pageName="Machines" options={options} />
      <div className=" all-machines padding-30px">
        <div className="flex column gap machines-container">
          <div>
            <h2>
              <Label placeholder="All Machines" />
            </h2>
          </div>
          <div className="all-card flex row  full-width space-btw search-bar">
            <ChooseOption
              options={response.data.MachineNames}
              onSelect={handleOptionChange}
              placeholder="searchMachine"
              width="20vw"
              leftIcon={faSearch}
              required={false}
            />
            <div className="flex gap-btn">
              <Button
                width="7vw"
                placeHolder="add"
                backgroundColor="primary"
                onClick={navigateToAddMachine}
              />
              <Button
                width="7vw"
                placeHolder="all"
                backgroundColor="primary"
                onClick={handleAllMachines}
              />
            </div>
          </div>
          <div className="  all-m-t">
            <div className="flex wrap  space-btw scrollable-machine-table">
              {allMachines.length > 0 ? (
                allMachines.map((machine) => (
                  <MachineCard
                    className="card-adjust"
                    style={{ maxWidth: "26.2vw" }}
                    height="20vw"
                    key={machine.id}
                    machineData={machine}
                    onEdit={() => editMachine(machine.id)}
                    onPreview={() => {
                      previewMachine(machine.id);
                    }}
                    onDelete={() => {
                      <SelectedMachine id={machine.id} />;
                      deleteMachine(machine.id);
                    }}
                  />
                ))
              ) : (
                <td colSpan="7">No tasks found</td>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMachines;
