import React, { useEffect, useState } from "react";
import "./style.css";
import Label from "../../base/Label";
import Icon from "../../base/Icon";
import {
  faAngleDown,
  faAngleLeft,
  faCalendarAlt,
  faClipboard,
  faGear,
  faInfoCircle,
  faLocation,
  faSearch,
  faTools,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../../base/Input";
import Button from "../../base/Button";
import { useDispatch, useSelector } from "react-redux";
import ReactDate from "../../base/ReactDate";
import { useNavigate, useParams } from "react-router-dom";
import { clearTask } from "../../data/redux/taskSlice";
import { Tasks } from "../../data/remote/Tasks";
import Header from "../../components/Header";
import ChooseOption from "../../base/ChooseOption";

const AddTask = () => {
  const { id } = useParams();
  const task = useSelector((global) => global);
  const [formData, setFormData] = useState({
    user_id: "",
    machine_id: "",
    spare_part_id: "",
    jobDescription: "",
    assignedDate: "",
    dueDate: "",
    status: "",
    location: "",
    username: "",
    machine_serial_number: "",
    spare_part_serial_number: "",
  });
  console.log("asdasdasdasdasd", formData);

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

  const getalltaskDetail = async () => {
    const data = await Tasks.GetAllTaskDetailsById(id);
    setFormData({
      ...data.task,
    });
  };
  const handleCreateTask = async () => {
    const dataToSend = {
      ...formData,
    };
    if (task.id) {
      const updateDate = await Tasks.UpdateTask(task.id, dataToSend);
      if (updateDate) {
        alert("Task Updated Successfully");
      }
    } else {
      const createData = await Tasks.CreateTask(dataToSend);
      if (createData) {
        alert("Task Created Successfully");
      }
    }
  };

  const handleDeleteTask = async () => {
    const data = await Tasks.DeleteTask(task.id);
    dispatch(clearTask());
    if (data === "") {
      alert("Task Deleted Successfully");
    }
    navigate("/tasks");
  };

  useEffect(() => {
    if (id) {
      getalltaskDetail();
    }
  }, []);

  const options = [
    { label: "Add/Edit Task", url: "addTask" },
    { label: "All Tasks", url: "tasks" },
  ];
  return (
    <div>
      <Header pageName="Tasks" showChooseInput={true} options={options} />
      <div className="flex column gap addTask-container center">
        <div className="flex full-width space-btw title ">
          <h2>
            <Label placeholder="Add or Edit Task" fontWeight="bold" />
          </h2>
          <Icon icon={faAngleLeft} onClick={navigateBack} />
        </div>
        <div className="flex column gap full-height addtask-inputs white-bg ">
          <div className="flex row center space-btw full-width">
            <Input
              name="Machine_id"
              placeHolder={task.machine_id || "choose machine "}
              leftIcon={faGear}
              rightIcon={faAngleDown}
              width="30vw"
              type="text"
              onChange={(e) => ChangingFormIput("machine_id", e.target.value)}
            />
            <Input
              name="user_id"
              placeHolder={"choose user"}
              leftIcon={faUser}
              rightIcon={faAngleDown}
              width="24vw"
              type="text"
              onChange={(e) => ChangingFormIput("user_id", e.target.value)}
            />
            <ChooseOption
              name="Username"
              placeholder={"choose user"}
              options={task.data.UserNames}
              onSelect={(e) => ChangingFormIput("username", e.label)}
              width="25vw"
              textColor="black"
              leftIcon={faSearch}
              required={false}
            />
          </div>
          <div className="flex row center space-btw full-width">
            <Input
              name="Spare Part"
              placeHolder={task.spare_part_id || "choose sparePart "}
              leftIcon={faTools}
              rightIcon={faAngleDown}
              width="30vw"
              type="text"
              required={false}
              onChange={(e) =>
                ChangingFormIput("spare_part_id", e.target.value)
              }
            />
            <Input
              name="status"
              placeHolder={task.status || "pending"}
              leftIcon={faInfoCircle}
              rightIcon={faAngleDown}
              width="30vw"
              type="text"
              onChange={(e) => ChangingFormIput("status", e.target.value)}
            />
          </div>
          <div className="flex row center space-btw full-width">
            <ReactDate
              leftIcon={faCalendarAlt}
              mindata={true}
              name="Assigned Date"
              required={true}
              width="30vw"
              onChange={(e) => ChangingFormIput("assignedDate", e)}
            />
            <ReactDate
              leftIcon={faCalendarAlt}
              mindata={true}
              name="Due Date"
              width="30vw"
              onChange={(e) => ChangingFormIput("dueDate", e)}
              required={true}
            />
          </div>
          <div className="full-width">
            <Input
              placeHolder={"location"}
              name="Location"
              leftIcon={faLocation}
              width="62vw"
              type="text"
              onChange={(e) => ChangingFormIput("location", e.target.value)}
            />
          </div>
          <div className="full-width">
            <Input
              placeHolder={"task"}
              name="Job Description"
              leftIcon={faClipboard}
              width="62vw"
              type="text"
              onChange={(e) =>
                ChangingFormIput("jobDescription", e.target.value)
              }
            />
          </div>
          <div className="flex end gap">
            <Button
              placeHolder="Delete"
              width="10vw"
              backgroundColor="primary"
              textColor="white"
              onClick={handleDeleteTask}
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
      </div>
    </div>
  );
};

export default AddTask;
