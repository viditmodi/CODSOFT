import React, { useEffect, useState } from "react";
import { Loader, TaskCard } from "../../components";
import URLs from "../../../js/apiURLs";

const ViewProjectPage = () => {
  const [taskList, setTaskList] = useState([]);
  const [projectData, setProjectData] = useState(undefined);
  const [taskData, setTaskData] = useState(undefined);
  // const [projectID, setProjectID] = useState("")
  const [isLoading, setIsloading] = useState(false)

  useEffect(() => {
    setIsloading(true)
    const queryParams = new URLSearchParams(window.location.search);
    const ID = queryParams.get("id");
    console.log(ID);
    // setProjectID(ID);

    // const userdata = fetchUserData();
    // setUserData(userdata);
    fetch(URLs.baseProjectURL + `?project_id=${ID}`)
      .then((response) => response.json())
      .then((res) => {
        // console.log("object")
        console.log(res);
        setTaskList(res.taskArray);
        setProjectData(res.data);
        setTaskData(res.tasks);
        setIsloading(false)
      })
      .catch((error) => console.log(error));
  }, []);

  const removeTaskFromList = (task_id) => {
    const taskArray = taskList.filter((task) => task.task_id !== task_id);
    setTaskList(taskArray);
  };

  function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc1 - utc2) / _MS_PER_DAY);
  }
  return (
    <>
    {isLoading && <Loader></Loader>}
    <section className="wrapper grid-container">
      <div className="grid-container__left">
        <div className="project-view__progress-container">
          <progress
            id="file"
            value={taskData?.completed}
            max={taskData?.total}
            className="project-view__progress"
          >
            {" "}
          </progress>
        </div>
        <div className="project-view__container">
          <div className="project-view__metadata">
            <h2 className="project-view__name">{projectData?.name}</h2>
            <p className="project-view__desc project-view__text">
              {projectData?.desc}
            </p>
            <p className="project-view__budget project-view__text">
              <strong>Budget: </strong>
              {projectData?.budget}
            </p>
            <p className="project-view__date project-view__text">
              <strong>Start:</strong>
              {new Date(projectData?.createdAt).toLocaleDateString()}
            </p>
            <p className="project-view__creator project-view__text">
              <strong>Created By:</strong>
              {projectData?.creator}
            </p>
            {/* <p className="project-view__stage project-view__text">

              {projectData?.stage}
            </p> */}
          </div>
          <div className="project-view__release">
            <p>
              {dateDiffInDays(new Date(projectData?.deadline), new Date())} Days
              left
            </p>
            <p>{new Date(projectData?.deadline).toLocaleDateString()}</p>
          </div>
          {/* <div className="project-view__overdue">release</div>
            <div className="project-view__upcoming">release</div> */}
        </div>
      </div>

      <div className="grid-container__right">
        <h2 className="create-project__heading heading heading--4">
          current tasks
        </h2>
        <div className="create-project__list">
          {taskList.length === 0 && <h1>no tasks</h1>}
          {taskList.length > 0 &&
            taskList.map((task, index) => {
              return (
                <TaskCard
                  data={task}
                  projectData={projectData}
                  index={index}
                  onDeletion={removeTaskFromList}
                  key={JSON.stringify(task)}
                />
                // <p>{JSON.stringify(task)}</p>
              );
            })}
        </div>
      </div>
    </section>
    </>
  );
};

export default ViewProjectPage;
