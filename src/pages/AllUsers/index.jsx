import React, { useEffect, useState } from "react";
import "./style.css";
import Input from "../../base/Input";
import Button from "../../base/Button";
import {
  faPenToSquare,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Users } from "../../data/remote/User";
import Icon from "../../base/Icon";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../data/redux/userSlice";
import DisplayImage from "../../base/DisplayImage";
import Header from "../../components/Header";
import Label from "../../base/Label";
import { useDarkMode } from "../../data/constext/DarkModeContext";
const AllUsers = () => {
  const { darkMode } = useDarkMode();

  const dispatch = useDispatch();
  const [allUsers, setAllUsers] = useState([]);
  const [searchUserId, setUserSearchId] = useState("");
  const navigate = useNavigate();
  const handleCreate = () => {
    navigate("/userProfile");
  };
  const handleEdit = async (id) => {
    const user = allUsers.find((user) => user.id === id);
    console.log("alluser->user", user.image_path);
    dispatch(
      updateUser({
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        location: user.location,
        role: user.role,
        image_path: user.image_path,
      })
    );
    navigate("/userprofile");
  };

  useEffect(() => {
    const handleGetAll = async () => {
      const data = await Users.GetAllUsers();
      setAllUsers(data.users);
    };
    handleGetAll();
  }, []);

  const DeleteUser = async (id) => {
    const data = await Users.DeleteUser(id);
    setAllUsers(allUsers.filter((user) => user.id !== id));
  };

  useEffect(() => {
    const handleSearch = async () => {
      if (searchUserId) {
        try {
          const data = await Users.SearchId(searchUserId);

          setAllUsers([data.user]);
        } catch (error) {
          setAllUsers([]);
        }
      } else {
        const data = await Users.GetAllUsers();
        setAllUsers(data.users);
      }
    };
    handleSearch();
  }, [searchUserId]);
  const options = [
    { label: "All Users", url: "allusers" },
    { label: "User Profile", url: "userProfile" },
  ];
  return (
    <div>
      <Header pageName="User Management" options={options} />
      <div className="flex column users-container gap">
        <h2>
          <Label
            placeholder="All Users"
            backgroundColor={darkMode ? "tertiary-bg" : "secondary"}
            textColor={darkMode ? "white" : "black"}
          />
        </h2>
        <div className="flex user-input-container">
          <Input
            required={false}
            width="20vw"
            placeHolder="search by id"
            leftIcon={faSearch}
            value={searchUserId}
            onChange={(e) => setUserSearchId(e.target.value)}
          />
          <div className="flex center gap">
            <Button
              className="filter-user"
              width="7vw"
              backgroundColor="primary"
              placeHolder="add"
              textColor="white"
              onClick={handleCreate}
            />
          </div>
        </div>
        <div
          className={`user-table padding-30px ${
            darkMode ? "black-bg" : "white-bg"
          }`}
        >
          <table>
            <thead className={darkMode ? "black" : "white"}>
              <tr>
                <th>Employee Name</th>
                <th>Employee Id</th>
                <th>Username</th>
                <th>Role</th>
                <th>Done Task</th>
                <th>Pending Task</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.length > 0 ? (
                allUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className=" flex gap">
                        <DisplayImage
                          url={user.image_path}
                          width="50px"
                          height="50px"
                        />
                        <div className=" flex center">{user.name}</div>
                      </div>
                    </td>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td>{user.doneTask}</td>
                    <td>{user.pendingTask}</td>
                    <td className="flex  gap icons-de">
                      <Icon
                        icon={faPenToSquare}
                        color="#00b7eb"
                        onClick={() => handleEdit(user.id)}
                      />
                      <Icon
                        icon={faTrash}
                        color="#00b7eb"
                        onClick={() => DeleteUser(user.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
