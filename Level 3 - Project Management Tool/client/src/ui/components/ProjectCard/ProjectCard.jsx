import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchUserData } from "../../../js/localstorage";
import URLs from "../../../js/apiURLs";


const ProjectCard = (props) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading]  = useState(false)
  useEffect(() => {
    const projectCard = document.getElementById(`projectCard${props.index}`);
    setUserData(fetchUserData);
    projectCard.classList.add(`project-card__${props.data.stage}`);
  }, [props.data.stage, props.index]);

  const deleteProject = async (id) => {
    setIsLoading(true)
    console.log("delete project");
    try {
      const response = await fetch(URLs.baseProjectURL + `?project_id=${id}`, {
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
  return (
    <div className="project-card" id={`projectCard${props.index}`}>
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
          <strong>created by:</strong> {props.data.creator}
        </p>
        <div className="project-card__btn-group">
          
          <NavLink to={`/projects/view?id=${props.data.project_id}`} className="btn project-card__btn project-card__btn--neutral">
            <span className="material-symbols-outlined">visibility</span>
          </NavLink>

          {props.data.creator===userData?.username && <NavLink to={`/tasks/add?id=${props.data.project_id}`} className="btn project-card__btn project-card__btn--neutral">
            <span className="material-symbols-outlined">open_in_new</span>
          </NavLink>}
          {props.data.creator===userData?.username && <button className="btn project-card__btn project-card__btn--danger" onClick={()=>{deleteProject(props.data.project_id)}}>
            <span className="material-symbols-outlined">delete</span>
          </button>}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
