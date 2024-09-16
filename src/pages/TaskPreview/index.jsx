import React, { useEffect, useState } from "react";
import "./style.css";
import { useDarkMode } from "../../data/constext/DarkModeContext";
import {
  faAngleRight,
  faClipboard,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Icon from "../../base/Icon";
import Label from "../../base/Label";
import { useNavigate, useParams } from "react-router-dom";
import { Tasks } from "../../data/remote/Tasks";
import Input from "../../base/Input";
import Button from "../../base/Button";
import ViewUserTask from "../../components/ViewUserTask";

const TaskPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [viewTasks, setViewTasks] = useState(false);
  const [task, setTask] = useState([]);
  const [formdata, setFormData] = useState({
    userReport: "",
    task_id: id || "",
  });
  const navigateBack = () => {
    navigate("/alerts");
  };
  const ChangingFormdata = (key, value) => {
    setFormData({
      ...formdata,
      [key]: value,
    });
  };
  console.log(task);
  const handleTask = async () => {
    const data = await Tasks.GetAllTaskDetailsById(formdata.task_id);
    setTask(data.task);
  };
  const viewOn = () => {
    setViewTasks(true);
  };
  const viewOff = () => {
    setViewTasks(false);
  };
  const handleTaskChoose = (task) => {
    setFormData({
      ...formdata,
      task_id: task.id,
    });
    viewOff();
  };
  useEffect(() => {
    handleTask();
  }, [formdata.task_id]);
  const handleSubmitTask = async () => {};
  return (
    <div>
      <Header pageName="Tasks" showChooseInput={false} />

      <div className="flex column gap addTask-container center">
        <div className="flex gap start title ">
          <Icon
            icon={faAngleRight}
            onClick={navigateBack}
            color={darkMode ? "white" : "black"}
          />
          <h2>
            <Label
              placeholder={"Task Details"}
              fontWeight="bold"
              backgroundColor={darkMode ? "tertiary-bg" : "secondary"}
              textColor={darkMode ? "white" : "black"}
            />
          </h2>
        </div>
        <div
          className={`flex column gap full-height addtask-inputs ${
            darkMode ? "black-bg" : "white-bg"
          }`}
        >
          <div className="flex start input-user-task-preview space-btw ">
            <Input
              placeHolder={formdata.task_id || "Ticket ID"}
              width="12vw"
              leftIcon={faSearch}
              required={false}
              onChange={(e) => ChangingFormdata("task_id", e.target.value)}
            />
            <Button
              placeHolder="View"
              width="7vw"
              backgroundColor="primary"
              textColor="white"
              onClick={viewOn}
              className="view-btn"
            />
            <div className="view-box">
              {viewTasks && (
                <ViewUserTask
                  className="view-box"
                  username={"leffler.paris"}
                  onexit={viewOff}
                  onchoose={handleTaskChoose}
                />
              )}
            </div>
          </div>
          {id || formdata.task_id ? (
            <div className=" flex column gap">
              <table
                className="task-details-table padding-30px "
                style={{
                  backgroundColor: darkMode ? "#171a1d" : "#f1f1f1",
                  color: darkMode ? "white" : "black",
                }}
              >
                <tbody>
                  <tr>
                    <td className="left-column">
                      <p>Task ID:</p>
                    </td>
                    <td className="right-column">
                      <p>{task?.id || "N/A"}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="left-column">
                      <p>Machine Serial Number:</p>
                    </td>
                    <td className="right-column">
                      <p>{task?.machine_serial_number || "N/A"}</p>
                    </td>
                  </tr>

                  <tr>
                    <td className="left-column">
                      <p>SparePart Serial Number:</p>
                    </td>
                    <td className="right-column">
                      <p>{task?.sparePart_serial_number || "N/A"}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="left-column">
                      <p>Assigned Date:</p>
                    </td>
                    <td className="right-column">
                      <p>{task?.assignedDate || "N/A"}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="left-column">
                      <p>Due Date:</p>
                    </td>
                    <td className="right-column">
                      <p>{task?.dueDate || "N/A"}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="left-column">
                      <p>Job Description:</p>
                    </td>
                    <td className="right-column">
                      <p>{task?.jobDescription || "N/A"}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex column gap-btn">
                <Input
                  placeHolder={"Report Details"}
                  name="Report"
                  leftIcon={faClipboard}
                  width="calc(48vw + 24px)"
                  type="text"
                  onChange={(e) =>
                    ChangingFormdata("userReport", e.target.value)
                  }
                />
                <div className="flex end">
                  <Button
                    placeHolder="Submit"
                    width="7vw"
                    backgroundColor="primary"
                    textColor="white"
                    onchoose={handleSubmitTask}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className=" flex start error-message">Search For task</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskPreview;
