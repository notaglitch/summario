import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import FileUpload from "./components/FileUpload";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<FileUpload />} />
      </Routes>
    </>
  );
}

export default App;
