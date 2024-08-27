import React, { useEffect, useState } from "react";
import "./style.css";
import Label from "../../base/Label";
import Button from "../../base/Button";
import { Tasks } from "../../data/remote/Tasks";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import HighlightLabel from "../../base/HighlightLable";
import { useNavigate } from "react-router-dom";
const AllTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const navigate = useNavigate();
  const handleEditNavigate = async (id) => {
    const task = allTasks.find((task) => task.id === id);
    navigate("/addTask");
  };
  useEffect(() => {
    const handleGetAllTasks = async () => {
      const data = await Tasks.GetAllTasks();
      setAllTasks(data.task);
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
                {allTasks.length > 0 ? (
                  allTasks.map((task) => (
                    <tr key={task.id}>
                      <td onClick={() => handleEditNavigate(task.id)}>
                        {task.id}
                      </td>
                      <td>{task.machine_id}</td>
                      <td>{task.user_id}</td>
                      <td>{task.assignedDate}</td>
                      <td>{task.dueDate}</td>
                      <td>{<HighlightLabel placeHolder={task.status} />}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No tasks found</td>
                  </tr>
                )}
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
