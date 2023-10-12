// const { baseAPIUrl } = require("./apiURLs");
const baseAPIUrl = "http://localhost:3100";


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

// module.exports = {loginUser}