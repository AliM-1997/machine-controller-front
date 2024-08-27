import React, { useEffect, useState } from "react";
import "./style.css";
import Label from "../../base/Label";
import Button from "../../base/Button";
import { Tasks } from "../../data/remote/Tasks";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
const AllTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  console.log("alltasks", allTasks);
  useEffect(() => {
    const handleGetAllTasks = async () => {
      const data = await Tasks.GetAllTasks();
      setAllTasks(data);
      console.log("data form handle", data);
    };
    handleGetAllTasks();
  }, []);
  return (
    <div className="flex column  gap task-container">
      <div>
        <h2>
          <Label placeholder="All Tasks" />
        </h2>
      </div>
      <div></div>
      <div className="flex column white-bg alltask">
        <div>
          <div className="flex space-btw white-bg center ">
            <div>
              <Label
                placeholder="status"
                fontWeight="bold"
                backgroundColor="white"
              />
            </div>
            <div className="flex center gap">
              <Button
                placeHolder="Date"
                backgroundColor="primary"
                width="10vw"
                textColor="white"
                leftIcon={faAngleDown}
                iconColor="white"
              />
              <Button
                placeHolder="Ticket"
                backgroundColor="primary"
                width="10vw"
                textColor="white"
                leftIcon={faAngleDown}
                iconColor="white"
              />
              <Button
                placeHolder="Status"
                backgroundColor="primary"
                width="10vw"
                textColor="white"
                leftIcon={faAngleDown}
                iconColor="white"
              />
            </div>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Machine ID</th>
                  <th>Employee</th>
                  <th>Assigned Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>task_id</td>
                  <td>machine_id</td>
                  <td>user_id</td>
                  <td>Assigned_Date</td>
                  <td>Dute_date</td>
                  <td>status</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default AllTasks;
