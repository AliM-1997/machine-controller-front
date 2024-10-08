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
import { useDarkMode } from "../../data/constext/DarkModeContext";
import { toast } from "react-toastify";
const AllMachines = () => {
  const { darkMode } = useDarkMode();
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
    navigate("/allmachines/addmachine");
  };
  const previewMachine = (id) => {
    const selecedmachine = allMachines.find((machine) => machine.id === id);
    dispatch(LoadMachine(selecedmachine));
    navigate(`/allmachines/selectedmachine/${id}`);
  };

  const editMachine = (id) => {
    const machine = allMachines.find((machine) => machine.id === id);
    dispatch(UpdateMachine(machine));
    navigate("/allmachines/addmachine");
  };
  const deleteMachine = async (id) => {
    const deleteData = await Machines.DeleteMachine(id);
    if (deleteData) {
      toast.success("Machine Deleted Successfully");
      handleAllMachines();
    } else {
      toast.error("Failed to delete machine. Please try again.");
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
    { label: "Add Machine", url: "allmachines/addmachine" },
  ];

  return (
    <div className="flex column gap">
      <Header pageName="Machines" options={options} />
      <div className=" all-machines padding-30px">
        <div className="flex column gap machines-container">
          <div>
            <h2>
              <Label
                placeholder="All Machines"
                backgroundColor={darkMode ? "tertiary-bg" : "secondary"}
                textColor={darkMode ? "white" : "black"}
              />
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
                placeHolder="Add"
                backgroundColor="primary"
                onClick={navigateToAddMachine}
                textColor="white"
              />
              <Button
                width="7vw"
                placeHolder="All"
                backgroundColor="primary"
                onClick={handleAllMachines}
                textColor="white"
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
                    boderDown={true}
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
