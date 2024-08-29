import React, { useState } from "react";
import "./style.css";
import Input from "../../base/Input";
import Button from "../../base/Button";
import { useNavigate } from "react-router-dom";
import { authRemote } from "../../data/remote/Auth_user";
import { authLocal } from "../../data/local/Auth_local";
import Header from "../../components/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSwitch = () => {
    navigate("/signup");
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
    navigate("/dashboard");
  };

  return (
    <div>
      <Header />
      <div className=" flex center column page-oo">
        <div className=" flex column center login-container white-bg gap ">
          <div className=" flex column center gap">
            <h1>
              <span className="highlight">D</span>ustry
            </h1>
            <div className="switch flex black-bg">
              <Button
                placeHolder="Login"
                backgroundColor="primary"
                width="125px"
                textColor="white"
              />
              <Button
                placeHolder="Register"
                backgroundColor="black"
                textColor="white"
                width="125px"
                onClick={handleSwitch}
              />
            </div>
          </div>
          <div className="flex column gap ">
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
            <p className="underline">forgetPassword?</p>
            <Button
              backgroundColor="primary"
              width="400px"
              textColor="White"
              placeHolder="Login"
              onClick={LoginHandler}
            />
            <Button
              className="employee"
              backgroundColor="secondary"
              width="400px"
              textColor="White"
              placeHolder="switch to employee"
              border={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
