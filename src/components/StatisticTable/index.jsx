import React from "react";
import "./style.css"; // Optional, for custom styling

const StatisticsTable = ({ data }) => {
  const maxValue = Math.max(
    data.Heat_Dissipation_Failure,
    data.No_Failure,
    data.Overstrain_Failure,
    data.Power_Failure,
    data.Tool_Wear_Failure
  );

  return (
    <div className="table-container">
      <table
        className="statistics-table"
        style={{ width: "100%", textAlign: "center" }}
      >
        <thead>
          <tr>
            <th>Failure Type</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Heat Dissipation Failure</td>
            <td
              style={{
                fontWeight:
                  data.Heat_Dissipation_Failure === maxValue
                    ? "bold"
                    : "normal",
              }}
            >
              {data.Heat_Dissipation_Failure}
            </td>
          </tr>
          <tr>
            <td>No Failure</td>
            <td
              style={{
                fontWeight: data.No_Failure === maxValue ? "bold" : "normal",
              }}
            >
              {data.No_Failure}
            </td>
          </tr>
          <tr>
            <td>Overstrain Failure</td>
            <td
              style={{
                fontWeight:
                  data.Overstrain_Failure === maxValue ? "bold" : "normal",
              }}
            >
              {data.Overstrain_Failure}
            </td>
          </tr>
          <tr>
            <td>Power Failure</td>
            <td
              style={{
                fontWeight: data.Power_Failure === maxValue ? "bold" : "normal",
              }}
            >
              {data.Power_Failure}
            </td>
          </tr>
          <tr>
            <td>Tool Wear Failure</td>
            <td
              style={{
                fontWeight:
                  data.Tool_Wear_Failure === maxValue ? "bold" : "normal",
              }}
            >
              {data.Tool_Wear_Failure}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">Date: {data.date}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default StatisticsTable;
