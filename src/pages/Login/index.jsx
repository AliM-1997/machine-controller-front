import React from "react";
import "./style.css";
import Input from "../../base/Input";
import Button from "../../base/Button";

const Login = () => {
  return (
    <div className="page flex center column ">
      <div className="flex column gap login-container">
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
        <Button
          backgroundColor="primary"
          width="400px"
          textColor="White"
          placeHolder="LogIn"
        />
      </div>
    </div>
  );
};

export default Login;
