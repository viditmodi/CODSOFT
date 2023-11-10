import React, { useEffect, useState } from "react";
import { fetchUserData } from "../../../js/localstorage";
import URLs from "../../../js/apiURLs";
import { Loader, ProjectCard } from "../../components";
import { checkLoginStatus } from "../../../js/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate()
  const [projectList, setProjectList] = useState([]);
  const [userData, setUserData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    checkLoginStatus().then((res) => {
      // console.log(res);
      if(!res){
        navigate("/login")
      }
    });
    const userdata = fetchUserData();
    setUserData(userdata);
    fetch(URLs.joinedProjectListURL + `?username=${userdata.username}`)
      .then((response) => response.json())
      .then((res) => {
        // console.log("object")
        console.log(res);
        setProjectList(res.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [navigate]);

  const removeProjectFromList = (project_id) => {
    const projectArray = projectList.filter(
      (project) => project.project_id !== project_id
    );
    setProjectList(projectArray);
  };

  return (
    <>
      {isLoading && <Loader></Loader>}
      <div className="wrapper grid-container">
        <div className="dashboard__profile grid-container__left">
          <h2 className="heading heading--3 dashboard__heading">
            User Profile
          </h2>
          <div className="dashboard__table">
            <p className="dashboard__left dashboard__cell">Name</p>
            <p className="dashboard__right dashboard__cell">
              {userData?.first_name} {userData?.last_name}
            </p>


            <p className="dashboard__left dashboard__cell">Username</p>
            <p className="dashboard__right dashboard__cell">
              {userData?.username}
            </p>


            <p className="dashboard__left dashboard__cell">email</p>
            <p className="dashboard__right dashboard__cell">
              {userData?.email}
            </p>


            <p className="dashboard__left dashboard__cell">contact</p>
            <p className="dashboard__right dashboard__cell">
              {userData?.phone}
            </p>


            <p className="dashboard__left dashboard__cell">joined on</p>
            <p className="dashboard__right dashboard__cell">
              {new Date(userData?.createdAt).toLocaleDateString()}
            </p>
          </div>
          {/* <p className="dashboard__name dashboard__text">
            <strong>Name:</strong> {userData?.first_name} {userData?.last_name}
          </p> */}
          {/* <p className="dashboard__username dashboard__text">
            <strong>Username:</strong> {userData?.username}
          </p> */}
          {/* <p className="dashboard__username dashboard__text">
            <strong>Email:</strong> {userData?.email}
          </p> */}
          {/* <p className="dashboard__username dashboard__text">
            <strong>Contact:</strong> {userData?.}
          </p> */}
          {/* <p className="dashboard__username dashboard__text">
            <strong>Joined on:</strong>{" "}
            {new Date(userData?.createdAt).toLocaleDateString()}
          </p>phone */}
        </div>
        <div className="dashboard__projects grid-container__right">
          <h2 className="create-project__heading heading heading--4">
            Your projects
          </h2>
          <div className="create-project__list">
            {projectList.length === 0 && <h1 className="default--text">no projects</h1>}
            {projectList.length > 0 &&
              projectList.map((project, index) => {
                return (
                  <ProjectCard
                    data={project}
                    index={index}
                    onDeletion={removeProjectFromList}
                    key={JSON.stringify(project)}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
