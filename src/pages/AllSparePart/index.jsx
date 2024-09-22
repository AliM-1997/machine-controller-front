import React from "react";
import "./style.css";
import Header from "../../components/Header";
import Label from "../../base/Label";
import { useDarkMode } from "../../data/constext/DarkModeContext";
import SparePartFilter from "../../components/SparePartFilter";
import { useNavigate } from "react-router-dom";
const AllSpareParts = () => {
  const { darkMode } = useDarkMode();

  const options = [
    { label: "All SparePrts", url: "allsparepart" },
    { label: "Add SparePart", url: "addsparepart" },
  ];
  return (
    <div>
      <Header pageName={"Spare Parts"} options={options} />
      <div className="flex column allsparepart-container gap">
        <div>
          <h2>
            <Label
              placeholder="All Spare Parts"
              backgroundColor={darkMode ? "tertiary-bg" : "secondary"}
              textColor={darkMode ? "white" : "black"}
            />
          </h2>
        </div>
        <div>
          <div className=" flex column gap sparepart-box">
            <SparePartFilter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSpareParts;
