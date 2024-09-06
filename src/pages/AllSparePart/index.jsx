import React from "react";
import "./style.css";
import Header from "../../components/Header";
import Label from "../../base/Label";
import { useDarkMode } from "../../data/constext/DarkModeContext";
import SparePartFilter from "../../components/SparePartFilter";
const AllSpareParts = () => {
  const { darkMode } = useDarkMode();

  return (
    <div>
      <Header pageName={"Spare Parts"} />
      <div className="flex column allsparepart-container gap">
        <div>
          <h2>
            <Label
              placeholder="All Spare Parts"
              backgroundColor={darkMode ? "terchuery-bg" : "secondary"}
              textColor={darkMode ? "white" : "black"}
            />
          </h2>
        </div>
        <div>
          <div className=" flex column gap white-bg sparepart-box">
            <SparePartFilter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSpareParts;
