import React, { useEffect, useState } from "react";
import "./style.css";
import Label from "../../base/Label";
import Icon from "../../base/Icon";
import {
  faAngleRight,
  faCalendarAlt,
  faClipboard,
  faLocation,
  faSearch,
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
import { useDarkMode } from "../../data/constext/DarkModeContext";

const AddTask = () => {
  const { darkMode } = useDarkMode();

  const { id } = useParams();
  const task = useSelector((global) => global);
  console.log(task);
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
    if (id) {
      const updateDate = await Tasks.UpdateTask(id, formData);
      if (updateDate) {
        alert("Task Updated Successfully");
        console.log(updateDate);
      }
    } else {
      const createData = await Tasks.CreateTaskByUsername(formData);
      if (createData) {
        alert("Task Created Successfully");
      }
    }
  };

  const handleDeleteTask = async () => {
    const data = await Tasks.DeleteTask(id);
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
            <Label
              placeholder={id ? "Edit Task" : "Add Task"}
              fontWeight="bold"
              backgroundColor={darkMode ? "tertiary-bg" : "secondary"}
              textColor={darkMode ? "white" : "black"}
            />
          </h2>
          <Icon
            icon={faAngleRight}
            onClick={navigateBack}
            color={darkMode ? "white" : "black"}
          />
        </div>
        <div className="flex column gap full-height addtask-inputs white-bg ">
          <div className="flex row center space-btw full-width">
            <ChooseOption
              name="Machine Serial Number"
              placeHolder={formData.machine_serial_number || "choose machine "}
              options={task.data.MachineSerialNumber}
              leftIcon={faSearch}
              width="24vw"
              type="text"
              onSelect={(e) =>
                ChangingFormIput("machine_serial_number", e.label)
              }
            />
            <ChooseOption
              name="Username"
              placeholder={"choose user"}
              options={task.data.UserNames}
              onSelect={(e) => ChangingFormIput("username", e.label)}
              width="24vw"
              textColor="black"
              leftIcon={faSearch}
              required={false}
            />
          </div>
          <div className="flex row center space-btw full-width">
            <ChooseOption
              name="Spare Part Serial Number"
              placeHolder={
                formData.spare_part_serial_number || "choose sparePart "
              }
              leftIcon={faSearch}
              width="24vw"
              type="text"
              required={false}
              onChange={(e) => ChangingFormIput("spare_part_id", e.label)}
            />
            <ChooseOption
              options={task.data.Taskstatus}
              name="Status"
              placeHolder={formData.status || "pending"}
              leftIcon={faSearch}
              width="24vw"
              type="text"
              onSelect={(e) => ChangingFormIput("status", e.label)}
            />
          </div>
          <div className="flex row center space-btw full-width">
            <ReactDate
              leftIcon={faCalendarAlt}
              mindata={true}
              name="Assigned Date"
              required={true}
              width="24vw"
              onChange={(e) => ChangingFormIput("assignedDate", e)}
            />
            <ReactDate
              leftIcon={faCalendarAlt}
              mindata={true}
              name="Due Date"
              width="24vw"
              onChange={(e) => ChangingFormIput("dueDate", e)}
              required={true}
            />
          </div>
          <div className="full-width">
            <Input
              placeHolder={"location"}
              name="Location"
              leftIcon={faLocation}
              width="calc(48vw + 24px)"
              type="text"
              onChange={(e) => ChangingFormIput("location", e.target.value)}
            />
          </div>
          <div className="full-width">
            <Input
              placeHolder={"task"}
              name="Job Description"
              leftIcon={faClipboard}
              width="calc(48vw + 24px)"
              type="text"
              onChange={(e) =>
                ChangingFormIput("jobDescription", e.target.value)
              }
            />
          </div>

          <div className="flex end gap">
            {id ? (
              <Button
                placeHolder="Delete"
                width="10vw"
                backgroundColor="primary"
                textColor="white"
                onClick={handleDeleteTask}
              />
            ) : (
              <></>
            )}
            <Button
              placeHolder={id ? "Save" : "Create"}
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
