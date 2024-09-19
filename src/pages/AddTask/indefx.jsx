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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { clearTask } from "../../data/redux/taskSlice";
import { Tasks } from "../../data/remote/Tasks";
import Header from "../../components/Header";
import ChooseOption from "../../base/ChooseOption";
import { useDarkMode } from "../../data/constext/DarkModeContext";
import { incrementNotification } from "../../data/redux/notification";
import { toast } from "react-toastify";

const AddTask = () => {
  const { darkMode } = useDarkMode();

  const location = useLocation();

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
    machine_serial_number: location.state?.machine_serial_number || "",
    spare_part_serial_number: location.state?.spare_part_serial_number || "",
  });
  console.log(formData.machine_serial_number);
  const [errors, setErrors] = useState({});
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
        toast.success("Task Updated Successfully");
      }
    } else {
      if (validateForm()) {
        const createData = await Tasks.CreateTaskByUsername(formData);
        console.log(createData);
        if (createData) {
          toast.success("Task Created Successfully");
          dispatch(incrementNotification());
        }
      }
    }
  };

  const handleDeleteTask = async () => {
    const data = await Tasks.DeleteTask(id);
    dispatch(clearTask());
    if (data === "") {
      toast.success("Task Deleted Successfully");
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
  const Taskstatus = [
    { label: "Completed" },
    { label: "Risked" },
    { label: "Delayed" },
    { label: "In Progress" },
    { label: "Pending" },
  ];
  const validateForm = () => {
    const newErrors = {};
    if (!formData.location) newErrors.location = "Location is required.";
    if (!formData.jobDescription)
      newErrors.jobDescription = "Job Description is required.";
    if (!formData.assignedDate)
      newErrors.assignedDate = "Assigned Date is required.";
    if (!formData.dueDate) newErrors.dueDate = "Due Date is required.";
    if (!formData.status) newErrors.status = "Status is required.";
    if (!formData.machine_serial_number)
      newErrors.machine_serial_number = "Machine Serial Number is required.";
    if (!formData.username) newErrors.username = "Username is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return (
    <div>
      <Header pageName="Tasks" showChooseInput={true} options={options} />
      <div className="flex column gap addTask-container center">
        <div className="flex gap start title ">
          <Icon
            icon={faAngleRight}
            onClick={navigateBack}
            color={darkMode ? "white" : "black"}
          />
          <h2>
            <Label
              placeholder={id ? "Edit Task" : "Add Task"}
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
          <div className="flex gap full-width start">
            <div className="flex column">
              <ChooseOption
                name="Machine Serial Number"
                placeholder={
                  formData.machine_serial_number || "choose machine "
                }
                options={task.data.MachineSerialNumber}
                leftIcon={faSearch}
                width="24vw"
                type="text"
                onSelect={(e) =>
                  ChangingFormIput("machine_serial_number", e.label)
                }
              />
              {errors.machine_serial_number && (
                <div className="error">{errors.machine_serial_number}</div>
              )}
            </div>
            <div className="flex column">
              <ChooseOption
                name="Username"
                placeholder={formData.username || "choose user"}
                options={task.data.UserNames}
                onSelect={(e) => ChangingFormIput("username", e.label)}
                width="24vw"
                textColor="black"
                leftIcon={faSearch}
                required={true}
              />
              {errors.username && (
                <div className="error">{errors.username}</div>
              )}
            </div>
          </div>
          <div className="flex gap full-width start">
            <div className="flex column">
              <ChooseOption
                options={task.data.SparePartSerialNumber}
                name="Spare Part Serial Number"
                placeholder={
                  formData.spare_part_serial_number || "choose sparePart "
                }
                leftIcon={faSearch}
                width="24vw"
                type="text"
                required={false}
                onSelect={(e) =>
                  ChangingFormIput("spare_part_serial_number", e.label)
                }
              />
            </div>
            <div className="flex column">
              <ChooseOption
                options={Taskstatus}
                name="Status"
                placeholder={formData.status || "pending"}
                leftIcon={faSearch}
                width="24vw"
                type="text"
                onSelect={(e) => ChangingFormIput("status", e.label)}
              />
              {errors.status && <div className="error">{errors.status}</div>}
            </div>
          </div>
          <div className="flex gap full-width start">
            <div className="flex column">
              <ReactDate
                placeHolder={formData.assignedDate || "yyyy-MM-dd"}
                leftIcon={faCalendarAlt}
                mindata={true}
                name="Assigned Date"
                required={true}
                width="24vw"
                onChange={(e) => ChangingFormIput("assignedDate", e)}
              />
              {errors.assignedDate && (
                <div className="error">{errors.assignedDate}</div>
              )}
            </div>
            <div className="flex column">
              <ReactDate
                leftIcon={faCalendarAlt}
                mindata={true}
                name="Due Date"
                width="24vw"
                onChange={(e) => ChangingFormIput("dueDate", e)}
                required={true}
              />

              {errors.dueDate && <div className="error">{errors.dueDate}</div>}
            </div>
          </div>
          <div className=" flex column full-width">
            <Input
              placeHolder={"location"}
              name="Location"
              leftIcon={faLocation}
              width="calc(48vw + 24px)"
              type="text"
              onChange={(e) => ChangingFormIput("location", e.target.value)}
            />
            {errors.location && <div className="error">{errors.location}</div>}
          </div>
          <div className="full-width flex column">
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
            {errors.jobDescription && (
              <div className="error">{errors.jobDescription}</div>
            )}
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
