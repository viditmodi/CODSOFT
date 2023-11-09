const baseURL = import.meta.env.VITE_API_URL
const baseAccountURL = `${import.meta.env.VITE_API_URL}/account`
const authAccountURL = `${import.meta.env.VITE_API_URL}/account/auth`


const baseProjectURL = `${import.meta.env.VITE_API_URL}/project`
const projectListURL = `${import.meta.env.VITE_API_URL}/project/list`
const joinedProjectListURL = `${import.meta.env.VITE_API_URL}/project/list/joined`


const baseTaskURL = `${import.meta.env.VITE_API_URL}/task`
const taskListURL = `${import.meta.env.VITE_API_URL}/task/list`
const taskCompleteURL = `${import.meta.env.VITE_API_URL}/task/complete`


const URLs = {baseURL, baseAccountURL, authAccountURL, baseProjectURL, projectListURL, baseTaskURL, taskListURL, joinedProjectListURL, taskCompleteURL}
export default URLs
// console.log(JSON.stringify(import.meta))