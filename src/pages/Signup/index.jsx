import React, { useState } from "react";
import "./style.css";
import Input from "../../base/Input";
import Button from "../../base/Button";
import { useNavigate } from "react-router-dom";
import { authRemote } from "../../data/remote/Auth_user";
import loginImage from "../../assets/images/Admin-Login.png";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const navigate = useNavigate();

  const handleswitch = () => {
    navigate("/login");
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handelSignup = async () => {
    if (!name || !email || !password || !confirmedPassword) {
      toast.error("All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (password !== confirmedPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      const data = await authRemote.Signup(email, password, name);
      console.log(data);
      if (data) {
        toast.success("Resiting successfully");
        navigate("/userlogin");
      }
    } catch (error) {
      toast.error("Unable registering");
    }
  };

  return (
    <div>
      <img src={loginImage} alt="admin" className="Admin-image" />

      <div className="flex column  Admin-container">
        <div className="flex column   gap signup-container ">
          <div className="flex column center gap ">
            <h1>
              <span className="highlight">D</span>ustry
            </h1>
            <div className="flex  black-bg switch">
              <Button
                placeHolder="Login"
                width="125px"
                backgroundColor="black"
                textColor="white"
                onClick={handleswitch}
              />
              <Button
                placeHolder="Sign Up"
                backgroundColor="primary"
                width="125px"
                textColor="white"
              />
            </div>
          </div>
          <div className="flex column signup-input gap-btn">
            <Input
              placeHolder="name"
              width="400px"
              name="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeHolder="example@gamil.com"
              width="400px"
              name="Email"
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
              placeHolder="Sign Up"
              onClick={handelSignup}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
