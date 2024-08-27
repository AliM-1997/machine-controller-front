import React, { useEffect, useState } from "react";
import "./style.css";
import Label from "../../base/Label";
import Icon from "../../base/Icon";
import {
  faAngleDown,
  faAngleLeft,
  faCalendarDays,
  faClipboard,
  faGear,
  faInfoCircle,
  faLocation,
  faTools,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../../base/Input";
import Button from "../../base/Button";
import { useDispatch, useSelector } from "react-redux";
import ReactDate from "../../base/ReactDate";
import { useNavigate } from "react-router-dom";
import { clearTask } from "../../data/redux/taskSlice";
import { Tasks } from "../../data/remote/Tasks";

const AddTask = () => {
  const task = useSelector((global) => global.task);
  const [formData, setFormData] = useState({
    user_id: "",
    machine_id: "",
    spare_part_id: "",
    jobDescription: "",
    assignedDate: null,
    dueDate: null,
    status: "",
    location: "",
  });
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...task,
      assignedDate: task.assignedDate ? new Date(task.assignedDate) : null,
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
    }));
  }, [task]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ChangingFormIput = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  const navigateBack = () => {
    dispatch(clearTask());
    navigate("/tasks");
  };

  const convertToDatabaseFormat = (date) => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toISOString().slice(0, 19).replace("T", " ");
    } else {
      console.error("Invalid date:", date);
      return "";
    }
  };
  const handleCreateTask = async () => {
    const dataToSend = {
      ...formData,
      assignedDate: convertToDatabaseFormat(formData.assignedDate),
      dueDate: convertToDatabaseFormat(formData.dueDate),
    };
    if (task.id) {
      const updateDate = await Tasks.UpdateTask(task.id, dataToSend);
      if (updateDate) {
        alert("Task Updated Successfully");
      }
    } else {
      const createData = await Tasks.CreateTask(dataToSend);
      if (createData) {
        alert("Task created Successfully");
      }
    }
  };

  return (
    <div className="flex column gap addTask-container">
      <div className="flex space-btw">
        <h2>
          <Label placeholder="Add/Edit Task" fontWeight="bold" />
        </h2>
        <Icon icon={faAngleLeft} onClick={navigateBack} />
      </div>
      <div className="flex row center space-btw full-width">
        <Input
          name="Machine_id"
          placeHolder={task.machine_id || "choose machine "}
          leftIcon={faGear}
          rightIcon={faAngleDown}
          width="37vw"
          type="text"
          onChange={(e) => ChangingFormIput("machine_id", e.target.value)}
        />
        <Input
          name="user_id"
          placeHolder={task.user_id || "choose user"}
          leftIcon={faUser}
          rightIcon={faAngleDown}
          width="37vw"
          type="text"
          onChange={(e) => ChangingFormIput("user_id", e.target.value)}
        />
      </div>
      <div className="flex row center space-btw full-width">
        <Input
          name="Spare Part"
          placeHolder={task.spare_part_id || "choose sparePart "}
          leftIcon={faTools}
          rightIcon={faAngleDown}
          width="37vw"
          type="text"
          required={false}
          onChange={(e) => ChangingFormIput("spare_part_id", e.target.value)}
        />
        <Input
          name="status"
          placeHolder={task.status || "pending"}
          leftIcon={faInfoCircle}
          rightIcon={faAngleDown}
          width="37vw"
          type="text"
          onChange={(e) => ChangingFormIput("status", e.target.value)}
        />
      </div>
      <div className="flex row center space-btw full-width">
        <ReactDate
          leftIcon={faCalendarDays}
          width="37vw"
          name="Assigned Date"
          placeHolder={
            formData.assignedDate
              ? formData.assignedDate.toISOString().slice(0, 10)
              : "dd/MM/yyyy"
          }
          onChange={(e) => ChangingFormIput("assignedDate", e)}
        />
        <ReactDate
          leftIcon={faCalendarDays}
          width="37vw"
          name="Due Date"
          placeHolder={
            formData.dueDate
              ? formData.dueDate.toISOString().slice(0, 10)
              : "dd/MM/yyyy"
          }
          onChange={(e) => ChangingFormIput("dueDate", e)}
        />
      </div>
      <div className="full-width">
        <Input
          placeHolder={task.location || "location"}
          name="Location"
          leftIcon={faLocation}
          type="text"
          onChange={(e) => ChangingFormIput("location", e.target.value)}
        />
      </div>
      <div className="full-width">
        <Input
          placeHolder={task.jobDescription || "task"}
          name="Job Description"
          leftIcon={faClipboard}
          type="text"
          onChange={(e) => ChangingFormIput("jobDescription", e.target.value)}
        />
      </div>
      <div className="flex end gap">
        <Button
          placeHolder="Delete"
          width="10vw"
          backgroundColor="primary"
          textColor="white"
        />
        <Button
          placeHolder="Save"
          backgroundColor="primary"
          width="10vw"
          textColor="white"
          onClick={handleCreateTask}
        />
      </div>
    </div>
  );
};

export default AddTask;
