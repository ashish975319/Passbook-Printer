import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PassBookLogin from "./components/PassBookLogin";
import GetOtp from "./components/GetOtp";
import Login from "./components/Login";
import Passbook from "./components/Passbook";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route exact path="/" element={<PassBookLogin />} /> */}
          <Route exact path="/" element={<Login />} />
          <Route exact path="/getOtp" element={<GetOtp />} />
          <Route path="/passbook" element={<Passbook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
