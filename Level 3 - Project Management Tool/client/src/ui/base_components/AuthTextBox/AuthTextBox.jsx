import React from "react";

const AuthTextBox = (props) => {
  const handleOnChange = (e) => {
    const indicator = document.getElementById(`${props.id}`);
    props.setValue(e.target.value);
    if (!props.validator) {
      if (e.target.value !== "") {
        indicator.classList.add("auth-textbox__indicator--neutral");
      } else {
        indicator.classList.remove("auth-textbox__indicator--neutral");
      }
      return;
    }

    if (props.validator(e.target.value)) {
      indicator.classList.add("auth-textbox__indicator--correct");
      indicator.classList.remove("auth-textbox__indicator--neutral");
      indicator.classList.remove("auth-textbox__indicator--incorrect");
    } else {
      indicator.classList.remove("auth-textbox__indicator--correct");
      indicator.classList.remove("auth-textbox__indicator--neutral");
      indicator.classList.add("auth-textbox__indicator--incorrect");
    }
  };
  return (
    <label className="auth-label">
      <input
        type={props.type}
        name={props.id}
        id={props.id}
        className={`auth-textbox textbox ${props.className}`}
        placeholder={props.placeholder}
        value={props.value}
        onChange={handleOnChange}
      />
      <span className="auth-textbox__placeholder">{props.placeholder}</span>
      <div className="auth-textbox__underline"></div>
    </label>
  );
};

export default AuthTextBox;
