import React, { Fragment } from "react";
import SideNavBar from "../SideNavBar/SideNavBar";

const Header = () => {
  return (
    <Fragment>
      <header className="header">
      <div className="header__container">
        <div className="header__logo-container">
          <img src="/src/assets/logo.png" alt="logo" className="header__logo" />
        </div>
        <h1 className="header__webname">{import.meta.env.VITE_WEB_NAME}</h1>
      </div>

      
    </header>
      <SideNavBar></SideNavBar>
    </Fragment>
  );
};

export default Header;
