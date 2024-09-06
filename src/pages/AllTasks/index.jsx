import React, { useEffect, useState } from "react";
import "./style.css";
import Label from "../../base/Label";
import { Tasks } from "../../data/remote/Tasks";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import HighlightLabel from "../../base/HighlightLable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadTask } from "../../data/redux/taskSlice";
import Input from "../../base/Input";
import Header from "../../components/Header";
import Button from "../../base/Button";
import TaskFilter from "../../components/TaskFilter";
import { useDarkMode } from "../../data/constext/DarkModeContext";

const AllTasks = () => {
  const { darkMode } = useDarkMode();
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
    username: "",
  });

  const ChangingFormat = (key, value) => {
    setFormData({
      machine_name: "",
      date: "",
      status: "",
      username: "",
      [key]: value,
    });
  };

  const navigate = useNavigate();

  const handleEditNavigate = async (id) => {
    const task = allTasks.find((task) => task.id === id);
    dispatch(loadTask(task));
    navigate(`/addTask/${id}`);
  };

  const handleGetAllTasks = async () => {
    setLoading(true);
    try {
      const data = await Tasks.GetAllTasks();
      setAllTasks(data.task || []);
    } catch (error) {
      console.error("Error fetching all tasks:", error);
      setAllTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskByMachineName = async () => {
    setLoading(true);
    try {
      const response = await Tasks.GetByMachineName(formData.machine_name);
      if (response && response.tasks.length > 0) {
        setAllTasks(response.tasks);
      } else {
        clearFilterState();
      }
    } catch (error) {
      console.error("Error fetching tasks by machine name:", error);
    } finally {
      setLoading(false);
      handleExitFilter();
    }
  };

  const handleTaskByStatus = async () => {
    setLoading(true);
    try {
      const response = await Tasks.GetTaskByStatus(formData.status);
      if (response && response.tasks.length > 0) {
        setAllTasks(response.tasks);
      } else {
        clearFilterState();
      }
    } catch (error) {
    } finally {
      setLoading(false);
      handleExitFilter();
    }
  };

  const handleGetTaskbyID = async (id) => {
    setLoading(true);
    try {
      if (id) {
        const data = await Tasks.GetTaskByID(id);
        setAllTasks([data.task]);
        setSearchId(id);
      } else {
        await handleGetAllTasks();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleTaskByDate = async () => {
    setLoading(true);
    try {
      const data = await Tasks.GetTaskByDate(formData.date);
      if (data && data.tasks.length > 0) {
        setAllTasks(data.tasks);
      } else {
        clearFilterState();
      }
    } catch (error) {
    } finally {
      setLoading(false);
      handleExitFilter();
    }
  };

  const handleTaskByUsername = async () => {
    setLoading(true);
    try {
      const data = await Tasks.GetTaskByUsername("hansen.eva");
      if (data && data.tasks.length > 0) {
        setAllTasks(data.tasks);
      } else {
        clearFilterState();
      }
    } catch (error) {
    } finally {
      setLoading(false);
      handleExitFilter();
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
      date: "",
      status: "",
      username: "",
    });
    setError("");
    setAllTasks([]);
  };

  useEffect(() => {
    handleGetAllTasks();
  }, []);

  const headerOptions = [
    { label: "All Tasks", url: "tasks" },
    { label: "Add/Edit Task", url: "addTask" },
  ];

  return (
    <div>
      <Header pageName="Tasks" options={headerOptions} />
      <div className="flex column gap task-container">
        <div>
          <h2>
            <Label
              placeholder="All Tasks"
              backgroundColor={darkMode ? "tertiary-bg" : "secondary"}
              textColor={darkMode ? "white" : "black"}
            />
          </h2>
        </div>
        <div></div>
        <div className="flex column white-bg alltask">
          <div className="flex column gap">
            <div className="flex space-btw white-bg center">
              <div>
                <Input
                  placeHolder="Ticket ID"
                  backgroundColor="white"
                  width="12vw"
                  leftIcon={faSearch}
                  iconColor="white"
                  required={false}
                  onChange={(e) => handleGetTaskbyID(e.target.value)}
                />
              </div>
              <div className="flex center gap-btn filter-btn-container">
                <Button
                  placeHolder="Clear"
                  width="7vw"
                  backgroundColor="primary"
                  textColor="white"
                  onClick={handleGetAllTasks}
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
                  <div className="filter-box">
                    <TaskFilter
                      Exitfilter={handleExitFilter}
                      selectMachine={(option) =>
                        handleOptionSelect("machine_name", option)
                      }
                      machineChange={handleTaskByMachineName}
                      selectStatus={(option) =>
                        handleOptionSelect("status", option)
                      }
                      StatusChange={handleTaskByStatus}
                      selectDate={(e) => ChangingFormat("date", e)}
                      DateChange={handleTaskByDate}
                      selectUsername={(option) =>
                        ChangingFormat("username", option)
                      }
                      UsernameChange={handleTaskByUsername}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="tasks-table">
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
                {loading && <div className="loading">Loading...</div>}
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
                        <td className="flex center">
                          <HighlightLabel
                            placeHolder={task.status}
                            style={{ fontWeight: "bold" }}
                          />
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
