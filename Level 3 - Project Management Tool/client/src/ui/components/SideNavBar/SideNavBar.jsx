import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { checkLoginStatus } from "../../../js/auth";

const SideNavBar = () => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    checkLoginStatus().then((res) => {
      console.log(res);
      if (res) {
        // Logged in
        setMenuData([
          {
            text: "dashoboard",
            link: "/dashboard",
          },
          {
            text: "create project",
            link: "/projects/create",
          },
          {
            text: "logout",
            link: "/logout",
          },
        ]);
      } else {
        // Logged Out
        setMenuData([
          {
            text: "home",
            link: "/",
          },
          {
            text: "login",
            link: "/login",
          },
          {
            text: "register",
            link: "/register",
          },
        ]);
      }
    });
  }, []);

  const toggleSideNavBar = () => {
    const sideNavBar = document.getElementById("sideNavBar");
    const width = sideNavBar.offsetWidth;
    if (width > 0) {
      sideNavBar.style.width = "0%";
    } else {
      sideNavBar.style.width = "100%";
    }
  };
  return (
    <Fragment>
      <button className="header__btn btn btn3d" onClick={toggleSideNavBar}>
        <span className="material-symbols-outlined">menu_open</span>
      </button>
      <div className="sidenavbar" id="sideNavBar">
        <div className="sidenavbar__container">
          <div className="sidenavbar__title-container">
            <h1 className="sidenavbar__title">
              {import.meta.env.VITE_WEB_NAME}
            </h1>
            <button
              className="sidenavbar__btn btn btn3d"
              onClick={toggleSideNavBar}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <nav className="sidenavbar__menu-container">
            <ul className="sidenavbar__menu">
              {menuData.map((item) => {
                return (
                  <li
                    className="sidenavbar__menu-item"
                    key={JSON.stringify(item)}
                    onClick={toggleSideNavBar}
                  >
                    <NavLink to={item.link} className={"sidenavbar__menu-link"}>
                      {item.text}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </Fragment>
  );
};

export default SideNavBar;
