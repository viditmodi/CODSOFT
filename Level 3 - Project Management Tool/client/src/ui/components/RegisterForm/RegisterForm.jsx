import React, { useState } from "react";
import { AuthTextBox, PushButton } from "../../base_components";
import { NavLink } from "react-router-dom";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      username,
      password,
    };

    console.log(data);
  };
  return (
    <form className="form form--auth" onSubmit={handleRegisterSubmit}>
      <h2 className="form__heading form__heading--auth">Register Portal</h2>
      <AuthTextBox
        type={"text"}
        id={"registerFirstName"}
        className={"form__textbox"}
        placeholder={"first name"}
        value={firstName}
        setValue={setFirstName}
      ></AuthTextBox>

      <AuthTextBox
        type={"text"}
        id={"registerLastName"}
        className={"form__textbox"}
        placeholder={"Last name"}
        value={lastName}
        setValue={setLastName}
      ></AuthTextBox>

      <AuthTextBox
        type={"text"}
        id={"registerUsername"}
        className={"form__textbox"}
        placeholder={"username"}
        value={username}
        setValue={setUsername}
      ></AuthTextBox>

      <AuthTextBox
        type={"text"}
        id={"registerEmail"}
        className={"form__textbox"}
        placeholder={"email"}
        value={email}
        setValue={setEmail}
      ></AuthTextBox>

      <AuthTextBox
        type={"text"}
        id={"registerPhone"}
        className={"form__textbox"}
        placeholder={"phone"}
        value={phone}
        setValue={setPhone}
      ></AuthTextBox>

      <AuthTextBox
        type={"password"}
        id={"registerPassword"}
        className={"form__textbox"}
        placeholder={"password"}
        value={password}
        setValue={setPassword}
      ></AuthTextBox>

      <AuthTextBox
        type={"password"}
        id={"registerPassword"}
        className={"form__textbox"}
        placeholder={"confirm password"}
        value={confirmPassword}
        setValue={setConfirmPassword}
      ></AuthTextBox>

      <PushButton
        className={"form__btn"}
        onClick={handleRegisterSubmit}
        fill={true}
      >
        register
      </PushButton>

      <hr className="form__hline" />

      <p className="form__text">
        Already working with TaskMate?{" "}
        <NavLink to={"/login"} className={"form__link"}>
          Login Here
        </NavLink>
      </p>
    </form>
  );
};

export default RegisterForm;
