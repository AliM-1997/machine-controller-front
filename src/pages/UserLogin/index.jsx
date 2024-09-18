import React, { useState } from "react";
import "./style.css";
import Input from "../../base/Input";
import Button from "../../base/Button";
import { useNavigate } from "react-router-dom";
import { authRemote } from "../../data/remote/Auth_user";
import { authLocal } from "../../data/local/Auth_local";
import loginImage from "../../assets/images/Admin-Login.png";
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleAdmin = () => {
    navigate("/login");
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const LoginHandler = async () => {
    if (!email || !password) {
      alert("All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const data = await authRemote.Login(email, password);
    authLocal.saveToken(data.authorisation.token);
    const userData = {
      username: data.user.username,
      email: data.user.email,
      name: data.user.name,
      role: data.user.role,
    };
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/taskpreview");
  };

  return (
    <div>
      <img src={loginImage} alt="admin" className="Admin-image" />
      <div className="flex  Admin-container">
        <div className=" flex  ">
          <div className=" flex column  login-container gap ">
            <div className=" flex column center gap">
              <h1>
                <span className="highlight">D</span>ustry
              </h1>
            </div>
            <div className="flex column gap-btn ">
              <Input
                name="Email"
                width="400px"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeHolder="examle@gmail.com"
              />
              <Input
                name="Password"
                width="400px"
                type="password"
                placeHolder="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <p className="underline">Forgot Password?</p>
              <Button
                backgroundColor="primary"
                width="400px"
                textColor="white"
                placeHolder="Login"
                onClick={LoginHandler}
              />
              <Button
                className="employee"
                backgroundColor="secondary"
                width="400px"
                textColor="White"
                placeHolder="Switch to Admin"
                border={true}
                onClick={handleAdmin}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
