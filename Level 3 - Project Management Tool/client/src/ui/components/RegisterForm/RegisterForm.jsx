import React, { useState } from "react";
import { AuthTextBox, PushButton } from "../../base_components";
import { Loader } from "../../components";
import { NavLink, useNavigate } from "react-router-dom";
import URLs from "../../../js/apiURLs";
import {
  isEmail,
  isEmpty,
  isNumber,
  isStrongPassword,
} from "../../../js/validators";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsloading] = useState(false);

  const handleRegisterSubmit = async (e) => {
    setIsloading(true);
    e.preventDefault();

    if (
      isEmpty(firstName) ||
      isEmpty(lastName) ||
      !isEmail(email) ||
      !isNumber(phone) ||
      phone.length !== 10 ||
      isEmpty(username) ||
      !isStrongPassword(password) ||
      isEmpty(confirmPassword) ||
      password !== confirmPassword
    ) {
      setIsloading(false);
      return alert("All fields are required");
    }

    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      username,
      password,
      confirm_password: confirmPassword,
    };

    console.log(data);
    console.log(URLs);

    try {
      const response = await fetch(URLs.baseAccountURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      console.log(res);
      if (!res.status) {
        setIsloading(false);
        return alert(res.message);
      }

      setIsloading(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    {isLoading && <Loader></Loader>}
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
    </>
  );
};

export default RegisterForm;
