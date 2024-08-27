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
const AddTask = () => {
  const task = useSelector((global) => global.task);
  const [formData, setFormData] = useState({
    user_id: "",
    machine_id: "",
    spare_part_id: "",
    jobDescription: "",
    assignedDate: "",
    dueDate: "",
    status: "",
    location: "",
  });
  console.log("formdata:", formData);
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...task,
    }));
  }, [task]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("formdata", formData);
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
          placeHolder={task.assignedDate || "dd/MM/yyyy"}
          onChange={(e) => ChangingFormIput("assignedDate", e)}
        />
        <ReactDate
          leftIcon={faCalendarDays}
          width="37vw"
          name="Due Date"
          placeHolder={task.dueDate || "dd/MM/yyyy"}
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
          placeHolder="save"
          backgroundColor="primary"
          width="10vw"
          textColor="white"
        />
      </div>
    </div>
  );
};

export default AddTask;
