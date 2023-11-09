export const saveAuthToken = (token)=>{
    localStorage.setItem("taskmate_authtoken", token)
}
export const fetchAuthToken = ()=>{
    return localStorage.getItem("taskmate_authtoken")
}
export const saveUserData = (data)=>{
    localStorage.setItem("taskmate_userdata", JSON.stringify(data))
}
export const fetchUserData = ()=>{
    return JSON.parse(localStorage.getItem("taskmate_userdata"))
}
export const saveProjectList = (data)=>{
    localStorage.setItem("taskmate_projectlist", JSON.stringify(data))
}
export const fetchProjectList = ()=>{
    return JSON.parse(localStorage.getItem("taskmate_projectlist"))
}
export const resetLocalStorage = ()=>{
    localStorage.removeItem("taskmate_authtoken")
    localStorage.removeItem("taskmate_userdata")
    localStorage.removeItem("taskmate_projectlist")
}