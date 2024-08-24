import React from "react";
import "./style.css";
import Input from "../../base/Input";
import Button from "../../base/Button";
const Signup = () => {
  return (
    <div className="flex column center page gap">
      <div>
        <h1>
          <span className="highlight">D</span>ustry
        </h1>
      </div>
      <div className="flex column signup-input ">
        <Input placeHolder="name" width="400px" name="Name" />
        <Input placeHolder="example@gamil.com" width="400px" name="Email" />
        <Input placeHolder="password" width="400px" name="Password" />
        <Input
          placeHolder="confirmed-password"
          width="400px"
          name="Confirmed Passowrd"
        />
      </div>
      <div className="flex column gap">
        <Button
          backgroundColor="primary"
          width="400px"
          textColor="white"
          placeHolder="Signup"
        />
      </div>
    </div>
  );
};

export default Signup;
