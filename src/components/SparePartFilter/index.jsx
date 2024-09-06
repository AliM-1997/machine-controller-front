import React, { useEffect, useState } from "react";
import "./style.css";
import SpareParts from "../../data/remote/spareParts";
import SparePartCard from "../SparePartCard";
import Label from "../../base/Label";
import { useDarkMode } from "../../data/constext/DarkModeContext";
const SparePartFilter = () => {
  const { darkMode } = useDarkMode();
  const [spareParts, setSpareParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [choosenItem, setChoosenItem] = useState({
    Electrical: false,
    Mechanical: false,
    oil: false,
    All: true,
  });
  console.log(spareParts);
  const itemChange = (key, value) => {
    setChoosenItem({
      Electrical: false,
      Mechanical: false,
      oil: false,
      All: false,
      [key]: value,
    });
  };
  const handleGetAllSpareParts = async () => {
    setLoading(true);
    const response = await SpareParts.GetAllSpareParts();
    if (response && response.machineInputs.length > 0) {
      setSpareParts(response.machineInputs);
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetAllSpareParts();
  }, [choosenItem.All]);
  return (
    <div>
      <table>
        <tr className="flex gap">
          <th
            className={
              choosenItem.Electrical
                ? darkMode
                  ? "underline-dark"
                  : "underline-light"
                : ""
            }
            onClick={() => itemChange("Electrical", true)}
          >
            <Label
              placeholder={"Electrical"}
              backgroundColor={darkMode ? "terchuery-bg" : "secondary"}
              textColor={darkMode ? "white" : "black"}
            />
          </th>
          <th
            className={
              choosenItem.Mechanical
                ? darkMode
                  ? "underline-dark"
                  : "underline-light"
                : ""
            }
            onClick={() => itemChange("Mechanical", true)}
          >
            <Label
              placeholder={"Mechanical"}
              backgroundColor={darkMode ? "terchuery-bg" : "secondary"}
              textColor={darkMode ? "white" : "black"}
            />
          </th>
          <th
            className={
              choosenItem.oil
                ? darkMode
                  ? "underline-dark"
                  : "underline-light"
                : ""
            }
            onClick={() => itemChange("oil", true)}
          >
            <Label
              placeholder={"Oil"}
              backgroundColor={darkMode ? "terchuery-bg" : "secondary"}
              textColor={darkMode ? "white" : "black"}
            />
          </th>
          <th
            className={
              choosenItem.All
                ? darkMode
                  ? "underline-dark"
                  : "underline-light"
                : ""
            }
            onClick={() => itemChange("All", true)}
          >
            <Label
              placeholder={"All"}
              backgroundColor={darkMode ? "terchuery-bg" : "secondary"}
              textColor={darkMode ? "white" : "black"}
            />
          </th>
        </tr>
      </table>
    </div>
  );
};

export default SparePartFilter;
