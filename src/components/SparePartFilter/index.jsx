import React, { useEffect, useState } from "react";
import "./style.css";
import SpareParts from "../../data/remote/spareParts";
const SparePartFilter = () => {
  const [choosenItem, setChoosenItem] = useState({
    Electrical: false,
    Mechanical: false,
    oil: false,
    All: false,
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
  const handleGetAllSpareParts = async () => {
    const response = await SpareParts.GetAllSpareParts();
    console.log(response);
  };
  useEffect(() => {
    handleGetAllSpareParts();
  }, [choosenItem.All]);
  return (
    <div>
      <table>
        <tr className="flex gap">
          <th
            className={choosenItem.Electrical ? "underline" : ""}
            onClick={() => itemChange("Electrical", true)}
          >
            Electrical
          </th>
          <th
            className={choosenItem.Mechanical ? "underline" : ""}
            onClick={() => itemChange("Mechanical", true)}
          >
            Mechincal
          </th>
          <th
            className={choosenItem.oil ? "underline" : ""}
            onClick={() => itemChange("oil", true)}
          >
            Oil
          </th>
          <th
            className={choosenItem.All ? "underline" : ""}
            onClick={() => itemChange("All", true)}
          >
            All
          </th>
        </tr>
      </table>
    </div>
  );
};

export default SparePartFilter;
