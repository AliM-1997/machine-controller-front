import React, { useState } from "react";
import "./style.css";
import Input from "../../base/Input";
import Button from "../../base/Button";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  return (
    <div className="flex column center page gap">
      <div className="flex column center white-bg gap signup-container">
        <div className="flex column center gap">
          <h1>
            <span className="highlight">D</span>ustry
          </h1>
          <div className="flex  black-bg switch">
            <Button
              placeHolder="Login"
              width="125px"
              backgroundColor="black"
              textColor="white"
            />
            <Button
              placeHolder="Signup"
              backgroundColor="primary"
              width="125px"
              textColor="white"
            />
          </div>
        </div>
        <div className="flex column signup-input ">
          <Input
            placeHolder="name"
            width="400px"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeHolder="example@gamil.com"
            width="400px"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeHolder="password"
            width="400px"
            name="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeHolder="password"
            type="password"
            width="400px"
            name="Confirmed Password"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
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
    </div>
  );
};

export default Signup;
