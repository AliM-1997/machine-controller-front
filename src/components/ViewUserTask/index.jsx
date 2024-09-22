import React, { useEffect, useState } from "react";
import "./style.css";
import { Tasks } from "../../data/remote/Tasks";
import Label from "../../base/Label";
import { useDarkMode } from "../../data/constext/DarkModeContext";
import Icon from "../../base/Icon";
import { faX } from "@fortawesome/free-solid-svg-icons";

const ViewUserTask = ({ username, onexit, onchoose }) => {
  const [userTasks, setUserTasks] = useState([]);
  const { darkMode } = useDarkMode();
  const handleUserTasks = async () => {
    if (username) {
      const data = await Tasks.GetTaskByUsername(username);
      setUserTasks(data.tasks);
    }
  };
  const handleTaskSelection = (task) => {
    if (onchoose) {
      onchoose(task);
    }
  };
  useEffect(() => {
    handleUserTasks();
  }, [username]);

  return (
    <div
      className={`flex column end gap padding-30px user-Tasks-id ${
        darkMode ? "tertiary-bg" : "secondary-bg"
      }`}
      style={{ color: darkMode ? "#fff" : "#000" }}
    >
      <Icon icon={faX} color={darkMode ? "white" : "black"} onClick={onexit} />
      {userTasks.length > 0 ? (
        userTasks.map((task) => (
          <div key={task.id} className="flex center gap">
            <p
              className="choose-task-id"
              style={{
                backgroundColor: darkMode ? "tertiary-bg" : "secondary-bg",
                color: darkMode ? "white" : "black",
              }}
              onClick={() => handleTaskSelection(task)}
            >
              Task ID:{" "}
            </p>
            <p>{task.id}</p>
          </div>
        ))
      ) : (
        <p>No tasks available for this user.</p>
      )}
    </div>
  );
};

export default ViewUserTask;
