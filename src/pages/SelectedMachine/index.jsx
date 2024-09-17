import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../components/Header";
import Label from "../../base/Label";
import DisplayImage from "../../base/DisplayImage";
import { useParams } from "react-router-dom";
import { Machines } from "../../data/remote/Machine";
import MachineCard from "../../components/MachineCard";
import ChooseOption from "../../base/ChooseOption";
import { useSelector } from "react-redux";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Button from "../../base/Button";
import SparePartCard from "../../components/SparePartCard";
import { useDarkMode } from "../../data/constext/DarkModeContext";
import SelectedMachineSparePart from "../../components/SelectedMachineSpartpart";

const SelectedMachine = () => {
  const { darkMode } = useDarkMode();
  const sparePart = useSelector((global) => global.data);
  const [displaySparepart, setDisplaySparePart] = useState([]);
  const [sparepartserialnumber, setSparePartSerialnumber] = useState("");
  const [addedSparepart, setAddedSparePart] = useState("");
  const { id } = useParams();
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const handleOptionSelect = (option) => {
    setSparePartSerialnumber(option.label);
  };
  const handleFilter = () => {
    setShowFilter(true);
  };

  const handleExitFilter = () => {
    setShowFilter(false);
  };
  const options = [
    { label: "Selected Machine", url: `selectedmachine/${id}` },
    { label: "Add Machine", url: "addmachine" },
    { label: "All Machines", url: "allmachines" },
  ];

  const handleMachineById = async () => {
    try {
      const data = await Machines.GetMachineById(id);
      setSelectedMachine(data.machine_input);
    } catch (error) {
      console.error("Error fetching machine:", error.message);
    }
  };

  const handleSparepart = async () => {
    if (selectedMachine && sparepartserialnumber) {
      try {
        const data = await Machines.getsparePartforMachine(
          selectedMachine.serial_number,
          addedSparepart
        );
        setDisplaySparePart([data.spare_part]);
      } catch (error) {
        console.error("Error fetching spare part for machine:", error.message);
      }
    }
  };

  const handleAllSparePart = async () => {
    if (selectedMachine) {
      try {
        const data = await Machines.GetallSparepartForMachine(
          selectedMachine.serial_number
        );
        setDisplaySparePart(data.spare_parts);
      } catch (error) {
        console.error("Error fetching all spare parts:", error.message);
      }
    }
  };

  const handleAddSparePart = async () => {
    const data = await Machines.AddSparePartToMachine(
      selectedMachine.serial_number,
      addedSparepart
    );
    if (data) {
      handleAllSparePart();
    }
  };
  useEffect(() => {
    handleMachineById();
  }, [id]);

  useEffect(() => {
    if (selectedMachine) {
      handleAllSparePart();
    }
  }, [selectedMachine]);

  useEffect(() => {
    handleSparepart();
  }, [sparepartserialnumber]);

  return (
    <div className="flex column gap">
      <Header pageName="Selected Machine" options={options} />
      <div className="flex column selectedMachine-container gap">
        <div className=" flex column gap">
          <h2>
            <Label
              placeholder="Selected Machine"
              backgroundColor={darkMode ? "black-bg" : "white-bg"}
              textColor={darkMode ? "white" : "black"}
            />
          </h2>

          {selectedMachine && (
            <div>
              <DisplayImage
                url={selectedMachine.image_path}
                width="100%"
                height="80vh"
                borderRadius="12px"
              />
            </div>
          )}
        </div>
        {selectedMachine && (
          <div>
            <MachineCard
              label={"Machine Info"}
              machineData={selectedMachine}
              width="0"
              height="0"
              className=""
              selected={true}
            />
          </div>
        )}
        <div className="flex column">
          <div
            className={`flex column gap padding-30px sparepart-container ${
              darkMode ? "black-bg" : "white-bg"
            }`}
          >
            <h2>
              <Label
                placeholder={"Spare Parts"}
                backgroundColor={darkMode ? "black-bg" : "white-bg"}
                textColor={darkMode ? "white" : "black"}
              />
            </h2>
            <div className="flex space-btw ">
              <ChooseOption
                options={sparePart.SparePartSerialNumber}
                backgroundColor="white"
                width="12vw"
                leftIcon={faSearch}
                iconColor="white"
                required={false}
                onSelect={handleOptionSelect}
              />
              <div>
                <div className="flex gap-btn sparepart-btn-box">
                  <Button
                    placeHolder="Add"
                    width="7vw"
                    backgroundColor="primary"
                    textColor="white"
                    className="sparepart-add-btn"
                    onClick={handleFilter}
                  />
                  <Button
                    placeHolder="All"
                    width="7vw"
                    backgroundColor="primary"
                    textColor="white"
                    onClick={handleAllSparePart}
                  />
                  {showFilter && (
                    <div className="addsparepart-btn">
                      <SelectedMachineSparePart
                        onExit={handleExitFilter}
                        onAdd={handleAddSparePart}
                        onselect={(option) => setAddedSparePart(option.label)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex wrap start gap full-width">
              {displaySparepart.length > 0 &&
                displaySparepart.map((sparePart) => (
                  <SparePartCard
                    className="sparepart-card"
                    key={sparePart.id}
                    sparePart={sparePart}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedMachine;
