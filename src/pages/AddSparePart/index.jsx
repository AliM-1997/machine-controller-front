import React from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import Label from "../../base/Label";
import Input from "../../base/Input";
import {
  faAngleRight,
  faAt,
  faClipboard,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { useDarkMode } from "../../data/constext/DarkModeContext";
import Icon from "../../base/Icon";
import Button from "../../base/Button";

const AddSparePart = () => {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleNavigateAllSparePart = () => {
    navigate("/allsparepart");
  };
  const options = [
    { label: "All SparePrts", url: "allsparepart" },
    { label: "Add SparePart", url: "addsparepart" },
  ];
  return (
    <div>
      <Header options={options} pageName="Machines" className="container" />
      <div className="flex column full-width addMachine-container gap center">
        <div className="flex column gap ">
          <div className="flex space-btw title ">
            <h2>
              <Label
                placeholder={"Add Machine"}
                backgroundColor={darkMode ? "tertiary-bg" : "secondary"}
                textColor={darkMode ? "white" : "black"}
              />
            </h2>
            <div className="flex center">
              <Icon icon={faAngleRight} onClick={handleNavigateAllSparePart} />
            </div>
          </div>
        </div>

        <div className="flex column gap full-height machine-inputs white-bg">
          <div className=" flex column gap-btn">
            <div className="flex gap full-width start">
              <div className="flex column">
                <Input
                  placeHolder={"name"}
                  name="Name"
                  width="24vw"
                  leftIcon={faGear}
                  type="text"
                />
              </div>
              <div className="flex column">
                <Input
                  leftIcon={faAt}
                  placeHolder={"serial number"}
                  name="Serial Number"
                  width="24vw"
                  type="text"
                />
              </div>
            </div>
            <div className="flex gap full-width start">
              <Input
                placeHolder={"description"}
                name="Standard Temperature"
                leftIcon={faClipboard}
                width="24vw"
                type="text"
              />
              <Input
                placeHolder={"Pressure"}
                name="Standard Pressure"
                leftIcon={faClipboard}
                width="24vw"
                type="text"
              />
            </div>
            <div className=" flex column"></div>

            <div className="flex center "></div>
            <div className="flex center ">
              <Input
                placeHolder={"description"}
                name="Spare Part Description"
                leftIcon={faClipboard}
                width="calc(48vw + 24px)"
                type="text"
                required={false}
              />
            </div>
          </div>
          <div className="flex end gap btn-con">
            <Button
              placeHolder="Delete"
              width="7vw"
              backgroundColor="primary"
              textColor="white"
            />
            <Button
              placeHolder="Save"
              backgroundColor="primary"
              width="7vw"
              textColor="white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSparePart;
