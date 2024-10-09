import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import About from "./components/About";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import Alert from "./components/Alert";

function App() {
  const [mode, setmode] = useState("light");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const modetogle = () => {
    if (mode === "dark") {
      setmode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Success Switched to Light mode", "success");
    } else {
      setmode("dark");
      document.body.style.backgroundColor = "#042743";
      showAlert("Success Switched to Dark mode", "success");
    }
  };
  return (
    <>
      <Router>
        <Navbar
          title="TestUtils"
          textutils="About textUtils"
          mode={mode}
          togglemode={modetogle}
          showAlert={showAlert}
        />
        <Alert Alert={alert} />
        <Routes>
          <Route exact path="/about" element={<About />} />
          <Route
            exact
            path="/"
            element={
              <TextForm
                heading="Enter Text Here"
                mode={mode}
                showAlert={showAlert}
              />
            }
          />
        </Routes>
      </Router>

      {/**/}
    </>
  );
}

export default App;
