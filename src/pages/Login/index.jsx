import React, { useState } from "react";
import "./style.css";
import Input from "../../base/Input";
import Button from "../../base/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSwitch = () => {
    navigate("/signup");
  };
  return (
    <div className="page flex center column ">
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
  );
};

export default Login;
