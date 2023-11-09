import React, { useState } from "react";
import { AuthTextBox, PushButton } from "../../base_components";
import { Loader } from "../../components";
import { NavLink, useNavigate } from "react-router-dom";
import URLs from "../../../js/apiURLs";
import { saveAuthToken, saveUserData } from "../../../js/localstorage";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false)

  const handleLoginSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();

    const data = {
      username,
      password,
    };

    console.log(data);

    try {
      const response = await fetch(URLs.authAccountURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      console.log(res);
      
      if (!res.status) {
        setIsLoading(false)
        return alert(res.message);
      }

      saveAuthToken(res.authToken)
      saveUserData(res.data)
      navigate("/dashboard");
      setIsLoading(false)
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    {isLoading && <Loader></Loader>}
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
    </>
  );
};

export default LoginForm;
