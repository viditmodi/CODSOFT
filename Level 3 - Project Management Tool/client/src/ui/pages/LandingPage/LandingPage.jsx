import React, { Fragment, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LoginForm, RegisterForm } from "../../components";
import AuthFormContainer from "../../containers/AuthFormContainer/AuthFormContainer";
import { PushButton } from "../../base_components";
import { checkLoginStatus } from "../../../js/auth";

const LandingPage = () => {
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(()=>{
    checkLoginStatus().then((res) => {
      // console.log(res);
      if(res){
        navigate("/dashboard")
      }
    });
  },[navigate])
  return (
    <Fragment>
      <section className="landing">
        <div className="landing__logo-container">
          <img
            src="/src/assets/logo.png"
            alt="logo"
            className="landing__logo"
          />
        </div>
        {/* {console.log(import.meta)} */}
        <h1 className="landing__title">{import.meta.env.VITE_WEB_NAME}</h1>
        <p className="landing__tagline">
          lorem ipsum dolor sit amet consectetur
        </p>
        <div className="landing__btn-group">
          <NavLink to={"/login"} className="landing__btn">
            <PushButton className={""} onClick={() => {}} fill={true}>
              login
            </PushButton>
          </NavLink>
          <NavLink to={"/register"} className="landing__btn">
            <PushButton className={""} onClick={() => {}} fill={false}>
              register
            </PushButton>
          </NavLink>
         
        </div>

        {/* {JSON.stringify(location)} */}
      </section>
      {location.pathname === "/login" && (
        <AuthFormContainer closeURL={"/"}>
          <LoginForm></LoginForm>
        </AuthFormContainer>
      )}
      {location.pathname === "/register" && (
        <AuthFormContainer closeURL={"/"}>
          <RegisterForm></RegisterForm>
        </AuthFormContainer>
      )}
    </Fragment>
  );
};

export default LandingPage;
