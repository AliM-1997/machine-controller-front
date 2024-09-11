import React from "react";
import "./style.css";
import Header from "../../components/Header";
import PredictionCard from "../../components/PredictionCard";
const Predictions = () => {
  return (
    <div>
      <Header showChooseInput={false} pageName={"Predictions"} />
      <div>
        <PredictionCard />
      </div>
    </div>
  );
};

export default Predictions;
