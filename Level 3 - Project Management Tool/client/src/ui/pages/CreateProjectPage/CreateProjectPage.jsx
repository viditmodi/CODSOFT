import React, { useEffect, useState } from "react";
import { PushButton } from "../../base_components";
import URLs from "../../../js/apiURLs";
import { fetchUserData } from "../../../js/localstorage";
import { Loader, ProjectCard } from "../../components";
import { useNavigate } from "react-router-dom";

const CreateProjectPage = () => {
  const navigate = useNavigate();
  //   const [formHeading, setFormHeading] = useState("create new project");
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [projectDeadline, setProjectDeadline] = useState(
    new Date().toLocaleDateString()
  );
  const [projectBudget, setProjectBudget] = useState("");

  const [projectList, setProjectList] = useState([]);
  const [userData, setUserData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false)

  const handleNameChange = (e) => {
    setProjectName(e.target.value);
  };
  const handleDescChange = (e) => {
    setProjectDesc(e.target.value);
  };
  const handleDeadlineChange = (e) => {
    setProjectDeadline(e.target.value);
  };
  const handleBudgetChange = (e) => {
    setProjectBudget(e.target.value);
  };

  useEffect(() => {
    setIsLoading(true)
    const userdata = fetchUserData();
    setUserData(userdata);
    fetch(URLs.projectListURL + `?username=${userdata.username}`)
      .then((response) => response.json())
      .then((res) => {
        // console.log("object")
        console.log(res);
        setProjectList(res.data);
        setIsLoading(false)
      })
      .catch((error) => console.log(error));
  }, []);

  const handleProjectCreation = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    const projectData = {
      name: projectName,
      deadline: new Date(projectDeadline),
      desc: projectDesc,
      budget: projectBudget,
      creator: userData.username,
    };

    console.log(projectData);

    const response = await fetch(URLs.baseProjectURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData),
    });
    const res = await response.json();

    console.log(res);

    if (!res.status) {
      setIsLoading(false)
      alert(res.message);
      return;
    }

    const projectArray = [res.data, ...projectList];
    // projectArray.push();
    setProjectList(projectArray);
    setProjectBudget(null);
    setProjectName("");
    setProjectDesc("");
    setProjectDeadline(null);
    // saveProjectList()
    setIsLoading(false)
    navigate("/tasks/add?id=" + res.data.project_id);
  };

  const removeProjectFromList = (project_id) => {
    const projectArray = projectList.filter(
      (project) => project.project_id !== project_id
    );
    setProjectList(projectArray);
  };
  return (
    <>
    {isLoading && <Loader></Loader>}
    <section className="wrapper create-project grid-container">
      <div className="create-project__left grid-container__left">
        <h1 className="heading heading--2 create-project__heading">
          create new project
        </h1>
        <form
          className="form create-project__form"
          onSubmit={handleProjectCreation}
        >
          <input
            type="text"
            name="projectName"
            id="projectName"
            className="form__textbox textbox create-project__textbox neuro-textbox"
            placeholder="project name"
            value={projectName}
            onChange={handleNameChange}
          />

          <textarea
            name="projectDesc"
            id="projectDesc"
            cols="30"
            rows="10"
            className="form__textbox textbox neuro-textbox"
            placeholder="description"
            value={projectDesc}
            onChange={handleDescChange}
          ></textarea>

          <input
            type="date"
            name="projectDeadline"
            id="projectDeadline"
            className="form__textbox textbox create-project__textbox neuro-textbox"
            value={projectDeadline}
            onChange={handleDeadlineChange}
          />

          <input
            type="number"
            name="projectBudget"
            id="projectBudget"
            className="form__textbox textbox create-project__textbox neuro-textbox"
            placeholder="budget"
            value={projectBudget}
            onChange={handleBudgetChange}
          />

          <PushButton
            fill={true}
            className={"create-project__btn"}
            onClick={handleProjectCreation}
          >
            create
          </PushButton>
        </form>
      </div>
      <div className="create-project__right grid-container__right">
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
    </section>
    </>
  );
};

export default CreateProjectPage;
