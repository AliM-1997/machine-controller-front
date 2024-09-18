import React from "react";
import "./style.css";
import BarGraph from "../BarGraph";
import { constructNow } from "date-fns";
import { format } from "date-fns";
import StatisticsTable from "../StatisticTable";

const PredictionMachineCard = ({ statistics }) => {
  const stats =
    Array.isArray(statistics) && statistics.length > 0
      ? Array.isArray(statistics[0]) && statistics[0].length > 0
        ? statistics[0][0]
        : {}
      : {};

  const data = [
    {
      date: format(new Date(), "yyyy-MM-dd"),
      Heat_Dissipation_Failure: stats.Heat_Dissipation_Failure,
      Overstrain_Failure: stats.Overstrain_Failure,
      Power_Failure: stats.Power_Failure,
      No_Failure: stats.No_Failure,
      Tool_Wear_Failure: stats.Tool_Wear_Failure,
    },
  ];

  console.log("Data prepared for BarGraph:", data);

  return (
    <div className="flex space-btw gap">
      <div>
        <StatisticsTable data={data} />
      </div>
      <BarGraph
        datas={data}
        type="Predictions Probability"
        title="Failure Prediction Overview"
        label="Failure Metrics"
      />
    </div>
  );
};

export default PredictionMachineCard;
