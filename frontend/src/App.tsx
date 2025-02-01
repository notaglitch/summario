import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import FileUpload from "./components/FileUpload";
import About from "./components/About";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/About" element={<About />}></Route>
      </Routes>
    </>
  );
}

export default App;
