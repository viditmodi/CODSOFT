import React, { useEffect, useState } from "react";
import { fetchUserData } from "../../../js/localstorage";
import URLs from "../../../js/apiURLs";
import { Loader, ProjectCard } from "../../components";

const Dashboard = () => {
  const [projectList, setProjectList] = useState([]);
  const [userData, setUserData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const userdata = fetchUserData();
    setUserData(userdata);
    fetch(URLs.joinedProjectListURL + `?username=${userdata.username}`)
      .then((response) => response.json())
      .then((res) => {
        // console.log("object")
        console.log(res);
        setProjectList(res.data);
        setIsLoading(false)
      })
      .catch((error) => console.log(error));
  }, []);

  const removeProjectFromList = (project_id) => {
    const projectArray = projectList.filter(
      (project) => project.project_id !== project_id
    );
    setProjectList(projectArray);
  };

  return (
    <>
    {isLoading && <Loader></Loader>}
    <div className="wrapper">
      <div className="dashboard__profile">
        <p className="dashboard__name dashboard__text">
          <strong>Name:</strong> {userData?.first_name} {userData?.last_name}
        </p>
        <p className="dashboard__username dashboard__text">
          <strong>Username:</strong> {userData?.username}
        </p>
        <p className="dashboard__username dashboard__text">
          <strong>Email:</strong> {userData?.email}
        </p>
        <p className="dashboard__username dashboard__text">
          <strong>Contact:</strong> {userData?.phone}
        </p>
        <p className="dashboard__username dashboard__text">
          <strong>Joined on:</strong> {new Date(userData?.createdAt).toLocaleDateString()}
        </p>
        
      </div>
      <div className="dashboard__projects">
        <h2 className="create-project__heading heading heading--4">
          Your projects
        </h2>
        <div className="create-project__list">
          {projectList.length === 0 && <h1>no projects</h1>}
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