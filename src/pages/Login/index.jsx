import React from "react";
import "./style.css";
import Input from "../../base/Input";
import Button from "../../base/Button";

const Login = () => {
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
            />
          </div>
        </div>
        <div className="flex column gap ">
          <Input
            className=""
            name="Email"
            width="400px"
            type="email"
            placeHolder="examle@gmail.com"
          />
          <Input
            name="Password"
            width="full-width"
            type="password"
            placeHolder="password"
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
