import React, { useEffect, useState } from "react";
import "./style.css";
import Label from "../../base/Label";
import { Tasks } from "../../data/remote/Tasks";
import {
  faAngleDown,
  faCalendarAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import HighlightLabel from "../../base/HighlightLable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadTask } from "../../data/redux/taskSlice";
import Input from "../../base/Input";
import Header from "../../components/Header";
import ChooseOption from "../../base/ChooseOption";
import ReactDate from "../../base/ReactDate";
import Button from "../../base/Button";
import TaskFilter from "../../components/TaskFilter";
const AllTasks = () => {
  const response = useSelector((global) => global);
  const dispatch = useDispatch();
  const [allTasks, setAllTasks] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [formData, setFormData] = useState({
    machine_name: "",
    date: "",
    status: "",
  });
  console.log(showFilter);
  const ChangingFormat = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  console.log(formData);
  const navigate = useNavigate();

  const handleEditNavigate = async (id) => {
    const task = allTasks.find((task) => task.id === id);
    dispatch(loadTask(task));
    navigate("/addTask");
  };

  const handleGetAllTasks = async () => {
    try {
      const data = await Tasks.GetAllTasks();
      setAllTasks(data.task || []);
    } catch (error) {
      console.error("Error fetching all tasks:", error);
      setAllTasks([]);
    }
  };

  const handleTaskByMachineName = async () => {
    const response = await Tasks.GetByMachineName(formData.machine_name);
    if (response && response.tasks.length > 0) {
      setAllTasks(response.tasks);
    } else {
      clearFilterState();
    }
  };

  const handleTaskByStatus = async () => {
    const response = await Tasks.GetTaskByStatus(formData.status);
    console.log("stsatus", response);
    if (response && response.tasks.length > 0) {
      setAllTasks(response.tasks);
    } else {
      clearFilterState();
    }
  };
  const handleGetTaskbyID = async (id) => {
    if (id) {
      const data = await Tasks.GetTaskByID(id);
      setAllTasks([data.task]);
      setSearchId(id);
    } else {
      handleGetAllTasks();
    }
  };

  const handleOptionSelect = (name, option) => {
    ChangingFormat(name, option.label);
  };
  const handleFilter = () => {
    setShowFilter(true);
  };
  const handleExitFilter = () => {
    setShowFilter(false);
  };

  const clearFilterState = () => {
    setFormData({
      machine_name: "",
      date: null,
      status: "",
    });
    setError("");
    setAllTasks([]);
  };

  useEffect(() => {
    if (formData.machine_name !== "") {
      handleTaskByMachineName();
    }
    if (formData.status !== "") {
      handleTaskByStatus();
    } else {
      handleGetAllTasks();
    }
  }, [formData.machine_name, formData.status]);

  useEffect(() => {
    handleGetAllTasks();
  }, []);

  const headerOptions = [
    { label: "All Tasks", url: "tasks" },
    { label: "Add/Edit Task", url: "addTask" },
  ];

  const statusOption = [
    { label: "Risked" },
    { label: "Completed" },
    { label: "Pending" },
    { label: "Delayed" },
    { label: "In Progress" },
  ];

  return (
    <div>
      <Header pageName="Tasks" options={headerOptions} />
      <div className="flex column gap task-container">
        <div>
          <h2>
            <Label placeholder="All Tasks" />
          </h2>
        </div>
        <div></div>
        <div className="flex column white-bg alltask">
          <div className="flex column gap">
            <div className="flex space-btw white-bg center">
              <div>
                <Label
                  placeholder=""
                  fontWeight="bold"
                  backgroundColor="white"
                />
              </div>
              <div className="flex center gap-btn">
                {/* <Input
                  placeHolder="Ticket ID"
                  backgroundColor="white"
                  width="12vw"
                  leftIcon={faSearch}
                  iconColor="white"
                  required={false}
                  onChange={(e) => handleGetTaskbyID(e.target.value)}
                />
                <ChooseOption
                  placeholder="machine "
                  options={response.data.MachineNames}
                  onSelect={(option) =>
                    handleOptionSelect("machine_name", option)
                  }
                  width="12vw"
                  textColor="black"
                  leftIcon={faAngleDown}
                  required={false}
                  // value={formData.status}
                />
                <ReactDate
                  leftIcon={faCalendarAlt}
                  required={true}
                  width="12vw"
                  onChange={(e) => ChangingFormat("date", e)}
                />
                <ChooseOption
                  options={statusOption}
                  onSelect={(option) => handleOptionSelect("status", option)}
                  width="12vw"
                  placeholder="choose status"
                  textColor="black"
                  leftIcon={faSearch}
                  required={false}
                /> */}
                <Button
                  placeHolder="Clear"
                  width="7vw"
                  backgroundColor="primary"
                  textColor="white"
                />
                <Button
                  placeHolder="Filter"
                  width="7vw"
                  backgroundColor="primary"
                  textColor="white"
                  onClick={handleFilter}
                  className="filter-btn"
                />
                {showFilter && (
                  <TaskFilter
                    className="filter-box"
                    Exitfilter={handleExitFilter}
                  />
                )}
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
                <tbody className="tasks-body">
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
                        <td className=" flex center">
                          {
                            <HighlightLabel
                              placeHolder={task.status}
                              style={{ fontWeight: "bold" }}
                            />
                          }
                        </td>
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
    </div>
  );
};

export default AllTasks;
