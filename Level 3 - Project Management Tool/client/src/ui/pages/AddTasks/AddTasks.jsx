import React, { useEffect, useState } from "react";
import { PushButton } from "../../base_components";
import URLs from "../../../js/apiURLs";
import { Loader, TaskCard } from "../../components";
// import { useNavigate } from 'react-router-dom'

const AddTasks = () => {
  // const navigate = useNavigate()

  const [projectID, setProjectID] = useState("");

  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskBudget, setTaskBudget] = useState("");
  const [taskAssignedTo, setTaskAssignedTo] = useState("");

  const [taskList, setTaskList] = useState([]);
  const [projectData, setProjectData] = useState(undefined);
  const [isLoading, setIsLoading  ] = useState(false)



  // const [taskName, setTaskName] = useState("")

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };
  const handleTaskDescChange = (e) => {
    setTaskDesc(e.target.value);
  };
  const handleTaskDeadlineChange = (e) => {
    setTaskDeadline(e.target.value);
  };
  const handleTaskBudgetChange = (e) => {
    setTaskBudget(e.target.value);
  };
  const handleTaskAssignedToChange = (e) => {
    setTaskAssignedTo(e.target.value);
  };

  useEffect(() => {
    setIsLoading(true)
    const queryParams = new URLSearchParams(window.location.search);
    const ID = queryParams.get("id");
    console.log(ID);
    setProjectID(ID);

    // const userdata = fetchUserData();
    // setUserData(userdata);
    fetch(URLs.taskListURL + `?project_id=${ID}`)
      .then((response) => response.json())
      .then((res) => {
        // console.log("object")
        console.log(res);
        setTaskList(res.data);
        setProjectData(res.projectData)
        setIsLoading(false)
      })
      .catch((error) => console.log(error));
  }, []);

  const handleTaskCreation = async (e) => {
    setIsLoading(true)
    console.log(projectID);
    e.preventDefault();
    const taskData = {
      name: taskName,
      deadline: new Date(taskDeadline),
      desc: taskDesc,
      budget: taskBudget,
      assigned_to: taskAssignedTo,
      project_id: projectID,
    };

    console.log(taskData);

    const response = await fetch(URLs.baseTaskURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    const res = await response.json();

    console.log(res);

    if (!res.status) {
      alert(res.message);
      setIsLoading(false)
      return;
    }

    const projectArray = [res.data, ...taskList];
    // projectArray.push();
    setTaskList(projectArray);
    setTaskBudget("");
    setTaskName("");
    setTaskDesc("");
    setTaskDeadline("");
    setTaskAssignedTo("");
    // saveProjectList()
    // navigate("/tasks/add?id="+res.data.project_id)
    setIsLoading(false)
  };

  const removeTaskFromList = (task_id)=>{
    const taskArray = taskList.filter(task=>task.task_id!==task_id)
    setTaskList(taskArray)
  }
  // console.log("object")
  return (
    <>
    {isLoading && <Loader></Loader>}
    <div className="wrapper grid-container">
      {/* add tasks {projectID} */}
      <div className="grid-container__left">
        <h1 className="heading heading--2 create-project__heading">
          create new task
        </h1>
        <form
          className="form create-project__form"
          onSubmit={handleTaskCreation}
        >
          <input
            type="text"
            name="taskName"
            id="taskName"
            className="form__textbox textbox create-project__textbox neuro-textbox"
            placeholder="task name"
            value={taskName}
            onChange={handleTaskNameChange}
          />

          <textarea
            name="taskDesc"
            id="taskDesc"
            cols="30"
            rows="10"
            className="form__textbox textbox neuro-textbox"
            placeholder="description"
            value={taskDesc}
            onChange={handleTaskDescChange}
          ></textarea>

          <input
            type="date"
            name="taskDeadline"
            id="taskDeadline"
            className="form__textbox textbox create-project__textbox neuro-textbox"
            value={taskDeadline}
            onChange={handleTaskDeadlineChange}
          />

          <input
            type="number"
            name="taskBudget"
            id="taskBudget"
            className="form__textbox textbox create-project__textbox neuro-textbox"
            placeholder="budget"
            value={taskBudget}
            onChange={handleTaskBudgetChange}
          />

          <input
            type="text"
            name="taskAssignedTo"
            id="taskAssignedTo"
            className="form__textbox textbox create-project__textbox neuro-textbox"
            placeholder="assigned to"
            value={taskAssignedTo}
            onChange={handleTaskAssignedToChange}
          />

          <PushButton
            fill={true}
            className={"create-project__btn"}
            onClick={handleTaskCreation}
          >
            create
          </PushButton>
        </form>
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
    </div>
    </>
  );
};

export default AddTasks;
