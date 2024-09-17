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
  const [error, setError] = useState(null);
  const [formdata, setFormData] = useState({
    userReport: "",
    task_id: id || "",
  });
  const storedUser = localStorage.getItem("user");
  let username = null;
  if (storedUser) {
    username = JSON.parse(storedUser).username;
  } else {
    console.log("No username found");
  }
  const navigateBack = () => {
    navigate("/alerts");
  };
  const ChangingFormdata = (key, value) => {
    setFormData({
      ...formdata,
      [key]: value,
    });
    setError(null);
  };
  const handleTask = async () => {
    try {
      const data = await Tasks.GetAllTaskDetailsById(formdata.task_id);
      if (data && data.task) {
        setTask(data.task);
        setError(null);
      } else {
        setTask([]);
        setError("Task not found for the given Task ID.");
      }
    } catch (error) {
      console.error("An error occurred while fetching task details:", error);
      setError("An error occurred while fetching task details.");
    }
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

  const handleSubmitTask = async () => {
    if (!formdata.userReport.trim()) {
      setError("Please provide a report before submitting.");
      return;
    }

    try {
      await Tasks.AddUserReport(formdata.task_id, formdata.userReport);
      alert("Task report submitted and marked as done.");
    } catch (error) {
      console.error("Error submitting task report:", error);
      setError("Failed to submit task report.");
    }
  };
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
                  username={username}
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
                {error && (
                  <p style={{ color: "red", margin: "10px 0" }}>{error}</p>
                )}
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
                    onClick={handleSubmitTask}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className=" flex start error-message ">Search For task</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskPreview;
