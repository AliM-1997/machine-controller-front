import React, { useEffect, useState } from "react";
import "./style.css";
import Label from "../../base/Label";
import Button from "../../base/Button";
import { Tasks } from "../../data/remote/Tasks";
import { faAngleDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import HighlightLabel from "../../base/HighlightLable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadTask } from "../../data/redux/taskSlice";
import DropButton from "../../base/DropButton";
import Input from "../../base/Input";

const AllTasks = () => {
  const dispatch = useDispatch();
  const [allTasks, setAllTasks] = useState([]);
  const navigate = useNavigate();

  const handleEditNavigate = async (id) => {
    const task = allTasks.find((task) => task.id === id);
    dispatch(loadTask(task));
    navigate("/addTask");
  };
  useEffect(() => {
    const handleGetAllTasks = async () => {
      const data = await Tasks.GetAllTasks();
      setAllTasks(data.task);
      // console.log("data form handle", data);
    };
    handleGetAllTasks();
  }, []);
  const handleSelect = (option) => {
    console.log("Selected option:", option);
  };
  const handleGetTaskById = async (id) => {
    const data = await Tasks.GetTaskByID(id);
    console.log("from handlebyid", data);
  };
  return (
    <div className="flex column  gap task-container">
      <div>
        <h2>
          <Label placeholder="All Tasks" />
        </h2>
      </div>
      <div></div>
      <div className="flex column white-bg alltask ">
        <div className="flex column gap">
          <div className="flex space-btw white-bg center ">
            <div>
              <Label
                placeholder="status"
                fontWeight="bold"
                backgroundColor="white"
              />
            </div>
            <div className="flex center gap">
              <Input
                placeHolder="Ticket ID"
                backgroundColor="white"
                width="12vw"
                leftIcon={faSearch}
                iconColor="white"
                required={false}
                onChange={(e) => {
                  handleGetTaskById(e.target.value);
                }}
              />
              <Button
                placeHolder="Date"
                backgroundColor="primary"
                width="10vw"
                textColor="white"
                leftIcon={faAngleDown}
                iconColor="white"
              />
              <DropButton
                options={[
                  "Pending",
                  "In Progress",
                  "Delayed",
                  "Risked",
                  "Completed",
                ]}
                onSelect={handleSelect}
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
                  <th className="center-text">Status</th>
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
