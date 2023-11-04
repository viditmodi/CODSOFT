import React, { useState } from "react";
import { AuthTextBox, PushButton } from "../../base_components";
import { NavLink } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    console.log(data)
  };
  return (
    <form className="form form--auth" onSubmit={handleLoginSubmit}>
      <h2 className="form__heading form__heading--auth">Login Portal</h2>
      <AuthTextBox
        type={"text"}
        id={"loginUsername"}
        className={"form__textbox"}
        placeholder={"username"}
        value={username}
        setValue={setUsername}
      ></AuthTextBox>
      <AuthTextBox
        type={"password"}
        id={"loginPassword"}
        className={"form__textbox"}
        placeholder={"password"}
        value={password}
        setValue={setPassword}
      ></AuthTextBox>

      <PushButton
        className={"form__btn"}
        onClick={handleLoginSubmit}
        fill={true}
      >
        login
      </PushButton>

      <hr className="form__hline" />

      <p className="form__text">
        New to TaskMate?{" "}
        <NavLink to={"/register"} className={"form__link"}>
          Register Here
        </NavLink>
      </p>
    </form>
  );
};

export default LoginForm;
