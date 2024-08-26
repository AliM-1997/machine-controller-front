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
const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchUserId, setUserSearchId] = useState("");
  console.log(searchUserId);
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
          width="300px"
          leftIcon={faSearch}
          value={searchUserId}
          onChange={(e) => setUserSearchId(e.target.value)}
        />
        <div className="flex center gap">
          <Button
            className="filter-user"
            width="200px"
            backgroundColor="primary"
            placeHolder="add User"
            textColor="white"
          />
          <Button
            className="add-user"
            width="120px"
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
                  <td>{user.name}</td>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>{user.doneTask}</td>
                  <td>{user.pendingTask}</td>
                  <td className="flex  gap">
                    <Icon icon={faPenToSquare} color="#00b7eb" />
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
