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
const AllUsers = () => {
  const dispatch = useDispatch();
  const [allUsers, setAllUsers] = useState([]);
  const [searchUserId, setUserSearchId] = useState("");
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/userProfile");
  };
  const handleEdit = async (id) => {
    const user = allUsers.find((user) => user.id === id);
    dispatch(
      updateUser({
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        location: user.location,
        role: user.role,
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
  return (
    <div className="flex column users-container gap">
      <div>
        <h2> All Users</h2>
      </div>
      <div className="flex user-input-container">
        <Input
          width="20vw"
          placeHolder="search by id"
          leftIcon={faSearch}
          value={searchUserId}
          onChange={(e) => setUserSearchId(e.target.value)}
        />
        <div className="flex center gap">
          <Button
            className="filter-user"
            width="10vw"
            backgroundColor="primary"
            placeHolder="add User"
            textColor="white"
            onClick={handleCreate}
          />
          <Button
            className="add-user"
            width="8vw"
            backgroundColor="primary"
            textColor="white"
            placeHolder="Filter"
          />
        </div>
      </div>
      <div className="">
        <table>
          <thead>
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
                    <div className=" ">
                      <DisplayImage url={user.image_path} />
                      {user.name}
                    </div>
                  </td>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>{user.doneTask}</td>
                  <td>{user.pendingTask}</td>
                  <td className="flex  gap">
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
  );
};

export default AllUsers;
