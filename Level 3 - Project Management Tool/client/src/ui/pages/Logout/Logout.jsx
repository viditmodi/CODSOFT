import React, { useEffect } from "react";
import { fetchAuthToken, fetchUserData, resetLocalStorage } from "../../../js/localstorage";
import URLs from "../../../js/apiURLs";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = fetchAuthToken();
    const userdata = fetchUserData();
    // let isLogout = false;

    fetch(
      URLs.authAccountURL + `?username=${userdata.username}&token=${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (!res.status) {
          return alert(res.message);
        }
        // isLogout = true;
        resetLocalStorage()
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
    //   if (isLogout) {
    // }
  }, []);
  return <div className="default--text">Logging Out</div>;
};

export default Logout;
