import React, { useState } from "react";
import Button from "../../base/Button";
import Papa from "papaparse";

const PredictionCard = ({ id }) => {
  const [csvData, setCsvData] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          setCsvData(results.data);
          console.log("Parsed CSV Data:", results.data);
        },
        header: true,
      });
    }
  };

  return (
    <div>
      <Button
        placeHolder="Statistics"
        backgroundColor="primary"
        textColor="white"
        onClick={() => document.getElementById("csvInput").click()}
      />
      <input
        id="csvInput"
        type="file"
        accept=".csv"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default PredictionCard;
