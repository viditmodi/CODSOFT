import "./css/main.scss";
import { Routes, Route, useLocation } from "react-router-dom";
import { LandingPage } from "./ui/pages";
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
      </Routes>
    </>
    // </BrowserRouter>
  );
}

export default App;
