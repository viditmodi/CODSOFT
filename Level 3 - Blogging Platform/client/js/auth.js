//red-f// Update the function later on
const checkLoginStatus = ()=>{
    const token = localStorage.getItem("quillcraft_authtoken");
    if(!token){
        return false
    }
    return true
}


  