import "./css/main.scss";
import { Routes, Route, useLocation } from "react-router-dom";
import { AddTasks, CreateProjectPage, Dashboard, LandingPage, Logout, ViewProjectPage } from "./ui/pages";
import { Header } from "./ui/components";

function App() {
  const location = useLocation();
  return (
    // <BrowserRouter>
    <>
      {!["/", "/login", "/register"].includes(location.pathname) && (
        <Header></Header>
      )}

      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>}></Route>
        <Route path="/login" element={<LandingPage page={"login"}></LandingPage>}></Route>
        <Route path="/register" element={<LandingPage page={"register"}></LandingPage>}></Route>
        <Route path="/logout" element={<Logout></Logout>}></Route>


        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>


        <Route path="/projects/create" element={<CreateProjectPage></CreateProjectPage>}></Route>

        <Route path="/projects/view" element={<ViewProjectPage></ViewProjectPage>}></Route>

        <Route path="/tasks/add" element={<AddTasks></AddTasks>}></Route>

      </Routes>
    </>
    // </BrowserRouter>
  );
}

export default App;
