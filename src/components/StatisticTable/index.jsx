import React from "react";
import "./style.css";
import { useDarkMode } from "../../data/constext/DarkModeContext";

const StatisticsTable = ({ data }) => {
  const { darkMode } = useDarkMode();
  const maxValue = Math.max(
    data.Heat_Dissipation_Failure,
    data.No_Failure,
    data.Overstrain_Failure,
    data.Power_Failure,
    data.Tool_Wear_Failure
  );
  return (
    <div
      className={`table-container ${
        darkMode ? "black-bg" : "white-bg"
      } full-height`}
    >
      <table
        className="statistics-table"
        style={{
          width: "100%",
          textAlign: "center",
          color: darkMode ? "white" : "black",
        }}
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
              {data[0].Heat_Dissipation_Failure}
            </td>
          </tr>
          <tr>
            <td>No Failure</td>
            <td
              style={{
                fontWeight: data.No_Failure === maxValue ? "bold" : "normal",
              }}
            >
              {data[0].No_Failure}
            </td>
          </tr>
          <tr>
            <td>Overstrain Failure</td>
            <td
              style={{
                fontWeight:
                  data[0].Overstrain_Failure === maxValue ? "bold" : "normal",
              }}
            >
              {data[0].Overstrain_Failure}
            </td>
          </tr>
          <tr>
            <td>Power Failure</td>
            <td
              style={{
                fontWeight: data.Power_Failure === maxValue ? "bold" : "normal",
              }}
            >
              {data[0].Power_Failure}
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
              {data[0].Tool_Wear_Failure}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">Date: {data[0].date}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default StatisticsTable;
