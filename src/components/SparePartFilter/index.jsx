import React, { useEffect, useState } from "react";
import "./style.css";
import SpareParts from "../../data/remote/spareParts";
import SparePartCard from "../SparePartCard";
import Label from "../../base/Label";
import { useDarkMode } from "../../data/constext/DarkModeContext";
import { useNavigate } from "react-router-dom";

const SparePartFilter = () => {
  const { darkMode } = useDarkMode();
  const [spareParts, setSpareParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [choosenItem, setChoosenItem] = useState({
    Electrical: false,
    Mechanical: false,
    oil: false,
    All: true,
  });

  const itemChange = (key, value) => {
    setChoosenItem({
      Electrical: false,
      Mechanical: false,
      oil: false,
      All: false,
      [key]: value,
    });
  };

  const handleEdite = (id) => {
    navigate(`/addSparepart/${id}`);
  };

  const handleGetAllSpareParts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await SpareParts.GetAllSpareParts();
      if (response && response.machineInputs.length > 0) {
        setSpareParts(response.machineInputs);
      }
    } catch (err) {
      setError("Failed to fetch spare parts.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetSparePartByType = async (type) => {
    setLoading(true);
    setError("");
    try {
      const response = await SpareParts.GetByType(type);
      console.log(response);
      if (response && response.machine.length > 0) {
        setSpareParts(response.machine);
      }
    } catch (err) {
      setError(`Failed to fetch ${type} spare parts.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (choosenItem.All) {
      handleGetAllSpareParts();
    } else if (choosenItem.Electrical) {
      handleGetSparePartByType("electrical");
    } else if (choosenItem.Mechanical) {
      handleGetSparePartByType("mechanical");
    } else if (choosenItem.oil) {
      handleGetSparePartByType("oil");
    }
  }, [choosenItem]);

  return (
    <div>
      <table>
        <tbody>
          <tr className="flex gap sparepart-filter">
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
                backgroundColor={darkMode ? "tertiary-bg" : "secondary"}
                textColor={darkMode ? "white" : "black"}
              />
            </th>
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
                backgroundColor={darkMode ? "tertiary-bg" : "secondary"}
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
                backgroundColor={darkMode ? "tertiary-bg" : "secondary"}
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
                backgroundColor={darkMode ? "tertiary-bg" : "secondary"}
                textColor={darkMode ? "white" : "black"}
              />
            </th>
          </tr>
        </tbody>
      </table>
      <div className="flex wrap gap full-width card-box">
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading &&
          spareParts.length > 0 &&
          spareParts.map((sparePart) => (
            <SparePartCard
              className="sparepart-card"
              key={sparePart.id}
              sparePart={sparePart}
              onEdit={() => handleEdite(sparePart.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default SparePartFilter;
