import React from "react";
import "./style.css";
import Header from "../../components/Header";
import Label from "../../base/Label";
import Input from "../../base/Input";
import Button from "../../base/Button";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const AllMachines = () => {
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
          />
          <Button
            width="8vw"
            placeHolder="add machine"
            backgroundColor="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default AllMachines;
