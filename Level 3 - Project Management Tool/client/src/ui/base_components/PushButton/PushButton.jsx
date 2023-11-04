import React from "react";

const PushButton = (props) => {
  return (
    <button
      className={`btn push-btn ${
        props.fill ? "push-btn--fill" : "push-btn--nofill"
      } ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default PushButton;
