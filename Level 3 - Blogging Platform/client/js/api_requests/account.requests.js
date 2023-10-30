// const { baseAPIUrl } = require("./apiURLs");
const baseAPIUrl = "http://localhost:3100";
// const baseAPIUrl = "https://quillcraft-api.onrender.com";


const loginUser = async (data) => {
  try {
    console.log(data)
    const response = await fetch(`${baseAPIUrl}/account/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    // console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const logoutUser = async () => {
  const token = localStorage.getItem("quillcraft_authtoken")
  try {
    console.log(token)
    const response = await fetch(`${baseAPIUrl}/account/logout`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "authorization": token }
    });

    const res = await response.json();
    // console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// module.exports = {loginUser}