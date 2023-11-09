import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchUserData } from "../../../js/localstorage";
import URLs from "../../../js/apiURLs";
import Loader from "../Loader/Loader";

const Taskcard = (props) => {
  const [userData, setUserData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const userdata = fetchUserData();
    setUserData(userdata);

    const taskCard = document.getElementById(`taskCard${props.index}`);
    // setUserData(fetchUserData);
    taskCard.classList.add(
      `task-card__${props.data.isCompleted ? "safe" : "danger"}`
    );
  }, [props.data.stage, props.index, props.data.isCompleted]);

  const deleteTask = async (id) => {
    setIsLoading(true)
    console.log("delete task");
    try {
      const response = await fetch(URLs.baseTaskURL + `?task_id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const res = await response.json();

      if (!res.status) {
        setIsLoading(false)
        return alert(res.message);
      }
      props.onDeletion(id);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  const markAsComplete = async (id) => {
    setIsLoading(true)
    console.log("mark complete task");
    try {
      const response = await fetch(URLs.taskCompleteURL + `?task_id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      const res = await response.json();

      if (!res.status) {
        setIsLoading(false)
        return alert(res.message);
      }
      // props.onDeletion(id);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    {isLoading && <Loader></Loader>}
    <div className="project-card" id={`taskCard${props.index}`}>
      <h2 className="project-card__name">{props.data.name}</h2>
      <p className="project-card__desc">{props.data.desc}</p>
      <div className="project-card__dates">
        <p className="project-card__date">
          <strong>start:</strong>{" "}
          {new Date(props.data.createdAt).toLocaleDateString()}
        </p>
        <p className="project-card__date">
          <strong>deadline:</strong>{" "}
          {new Date(props.data.deadline).toLocaleDateString()}
        </p>
      </div>
      <div className="project-card__row">
        <p className="project-card__creator">
          <strong>assigned to:</strong> {props.data.assigned_to}
        </p>
        <div className="project-card__btn-group">
          <NavLink
            to={`/tasks/add?id=${props.data.project_id}`}
            className="btn project-card__btn project-card__btn--neutral"
          >
            <span className="material-symbols-outlined">open_in_new</span>
          </NavLink>
          {props.projectData.creator === userData?.username && (
            <button
              className="btn project-card__btn project-card__btn--danger"
              onClick={() => {
                deleteTask(props.data.task_id);
              }}
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          )}
          {props.data.assigned_to === userData?.username && (
            <button
              className="btn project-card__btn project-card__btn--safe"
              onClick={() => {
                markAsComplete(props.data.task_id);
              }}
            >
              <span className="material-symbols-outlined">task_alt</span>
            </button>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Taskcard;
