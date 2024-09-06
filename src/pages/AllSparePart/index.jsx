import React from "react";
import "./style.css";
import Header from "../../components/Header";
import Label from "../../base/Label";
import { useDarkMode } from "../../data/constext/DarkModeContext";
const AllSpareParts = () => {
  const { darkMode } = useDarkMode();

  return (
    <div>
      <Header pageName={"Spare Parts"} />
      <div className="flex column allsparepart-container">
        <div>
          <h2>
            <Label
              placeholder="All Spare Parts"
              backgroundColor={darkMode ? "terchuery-bg" : "secondary"}
              textColor={darkMode ? "white" : "black"}
            />
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AllSpareParts;
